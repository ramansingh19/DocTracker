import React, { useEffect, useState } from 'react';

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
    <div className="relative inline-block">
      <button 
        className="relative bg-transparent border-0 cursor-pointer p-2 rounded-lg transition-all duration-300 text-slate-500 hover:bg-black/5 hover:text-gray-700"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Notifications"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-pulse">{unreadCount}</span>
        )}
      </button>

      {isVisible && (
        <div className="absolute top-full right-0 w-[400px] max-w-[90vw] bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-black/5 z-[1000] mt-2 animate-[slideDown_0.3s_ease-out] md:w-[calc(100vw-2rem)]">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-br from-slate-50 to-slate-200 rounded-t-xl">
            <h3 className="text-lg font-semibold text-gray-900 m-0">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="bg-transparent border-0 text-blue-500 text-sm font-medium cursor-pointer px-2 py-1 rounded transition-all duration-300 hover:bg-blue-500/10">
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-auto py-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-gray-400">
                <span className="text-3xl mb-2">🔕</span>
                <p className="text-sm m-0">No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`flex items-start gap-3 px-6 py-4 cursor-pointer transition-all duration-300 relative border-l-[3px] hover:bg-black/[0.02] ${notification.read ? 'border-transparent' : 'bg-blue-500/[0.02] border-blue-500 hover:bg-blue-500/5'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="text-xl w-6 h-6 flex items-center justify-center flex-shrink-0" style={{ color: getNotificationColor(notification.type) }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{notification.title}</div>
                    <div className="text-xs text-slate-500 mb-1 leading-snug break-words">{notification.message}</div>
                    <div className="text-xs text-gray-400 font-medium">{notification.time}</div>
                  </div>
                  {!notification.read && <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                </div>
              ))
            )}
          </div>
          
          <div className="p-6 border-t border-gray-200 bg-gradient-to-br from-slate-50 to-slate-200 rounded-b-xl">
            <button className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 py-3 px-4 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)]">View All Notifications</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
