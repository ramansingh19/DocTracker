import React, { useEffect, useState } from 'react';
import './NotificationSystem.css';

const NotificationSystem = ({ userRole = 'patient' }) => {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock real-time notifications based on user role
  useEffect(() => {
    const generateNotifications = () => {
      const roleNotifications = {
        doctor: [
          { id: 1, type: 'urgent', title: 'Emergency Patient', message: 'Patient John Doe requires immediate attention', time: '2 min ago', read: false },
          { id: 2, type: 'info', title: 'Schedule Update', message: 'Your next appointment is in 15 minutes', time: '5 min ago', read: false },
          { id: 3, type: 'success', title: 'Patient Checked In', message: 'Sarah Wilson has arrived for her appointment', time: '10 min ago', read: true }
        ],
        patient: [
          { id: 1, type: 'info', title: 'Queue Update', message: 'You are now position #3 in the queue', time: '1 min ago', read: false },
          { id: 2, type: 'success', title: 'Doctor Available', message: 'Dr. Johnson is now available and will see you soon', time: '3 min ago', read: false },
          { id: 3, type: 'warning', title: 'Appointment Reminder', message: 'Your appointment is in 30 minutes', time: '15 min ago', read: true }
        ],
        admin: [
          { id: 1, type: 'urgent', title: 'System Alert', message: 'High patient volume detected in Emergency Department', time: '1 min ago', read: false },
          { id: 2, type: 'info', title: 'Performance Report', message: 'Daily efficiency report is ready for review', time: '5 min ago', read: false },
          { id: 3, type: 'success', title: 'System Update', message: 'All systems are running optimally', time: '1 hour ago', read: true }
        ]
      };

      setNotifications(roleNotifications[userRole] || []);
      setUnreadCount(roleNotifications[userRole]?.filter(n => !n.read).length || 0);
    };

    generateNotifications();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setNotifications(prev => {
        const newNotification = {
          id: Date.now(),
          type: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)],
          title: 'Live Update',
          message: `System update at ${new Date().toLocaleTimeString()}`,
          time: 'Just now',
          read: false
        };
        
        const updated = [newNotification, ...prev.slice(0, 4)];
        setUnreadCount(updated.filter(n => !n.read).length);
        return updated;
      });
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, [userRole]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return '🚨';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent': return '#ef4444';
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="notification-system">
      <button 
        className="notification-bell"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Notifications"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isVisible && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-read">
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <span>🔕</span>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon" style={{ color: getNotificationColor(notification.type) }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                  {!notification.read && <div className="unread-indicator"></div>}
                </div>
              ))
            )}
          </div>
          
          <div className="notification-footer">
            <button className="view-all">View All Notifications</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
