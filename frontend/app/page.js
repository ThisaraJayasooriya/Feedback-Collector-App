"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = useRef(null);

  const API_URL = 'http://localhost:5000/api/feedback';

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(API_URL);
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(API_URL, { name, message });
      setName('');
      setMessage('');
      fetchFeedbacks(); // Refresh list
      showNotification('Thank you — your feedback has been submitted.', 'success');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showNotification('Unable to submit feedback. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Notification helpers
  const showNotification = (message, type = 'success') => {
    // clear any existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({ message, type, visible: true });
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification((prev) => (prev ? { ...prev, visible: false } : null));
    }, 4000);
  };

  const closeNotification = () => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification(null);
  };

  const isFormValid = name.trim() !== '' && message.trim().length >= 10;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Notification */}
      {notification && notification.visible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-6 right-6 z-50 w-96 max-w-full transition-transform duration-300"
        >
          <div className={`flex items-start gap-3 p-4 rounded-lg shadow-md border ${notification.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`p-2 rounded-full text-sm font-semibold ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {notification.type === 'success' ? '✓' : '!' }
            </div>
            <div className="flex-1">
              <p className={`font-medium text-sm ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{notification.message}</p>
            </div>
            <button onClick={closeNotification} className="text-gray-500 hover:text-gray-700 ml-2" aria-label="Close notification">✕</button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">We value your feedback</h1>
        <p className="text-center text-gray-600 mb-8">Share your experience or suggestions — your input helps us improve.</p>
        
        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-2">Submit your feedback</h2>
          <p className="text-sm text-gray-500 mb-6">Please be specific so we can act on your input. Fields marked with * are required.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Jane Doe"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Feedback *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="5"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="What worked well? What could be improved?"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">Minimum 10 characters</p>
                <p className={`text-xs ${message.trim().length < 10 ? 'text-red-500' : 'text-gray-500'}`}>{message.trim().length} / 500</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full inline-flex justify-center items-center gap-2 ${isFormValid && !loading ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'} text-white py-2 rounded-md`}
            >
              {loading ? 'Submitting...' : 'Send Feedback'}
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent feedback</h2>
          {feedbacks.length === 0 ? (
            <p className="text-gray-500">No feedback yet — be the first to share your thoughts.</p>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback._id} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{feedback.name}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{feedback.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}