import React, { useEffect, useState } from 'react';
import './IndustryFeatures.css';

const IndustryFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const industryFeatures = [
    {
      id: 1,
      title: "AI-Powered Predictive Analytics",
      description: "Machine learning algorithms predict patient flow, optimize scheduling, and identify potential bottlenecks before they occur.",
      icon: "🤖",
      features: [
        "Predictive patient volume forecasting",
        "Intelligent appointment scheduling",
        "Resource optimization recommendations",
        "Early warning system for capacity issues"
      ],
      metrics: {
        accuracy: "94%",
        efficiency: "+35%",
        satisfaction: "+28%"
      }
    },
    {
      id: 2,
      title: "Real-Time IoT Integration",
      description: "Seamless integration with IoT devices, wearables, and hospital equipment for comprehensive patient monitoring.",
      icon: "📡",
      features: [
        "Wearable device data integration",
        "Real-time vital signs monitoring",
        "Smart equipment status tracking",
        "Automated emergency alerts"
      ],
      metrics: {
        devices: "500+",
        uptime: "99.9%",
        response: "<2s"
      }
    },
    {
      id: 3,
      title: "Advanced Security & Compliance",
      description: "Enterprise-grade security with HIPAA compliance, end-to-end encryption, and comprehensive audit trails.",
      icon: "🔒",
      features: [
        "HIPAA compliant data handling",
        "End-to-end encryption",
        "Multi-factor authentication",
        "Comprehensive audit logging"
      ],
      metrics: {
        compliance: "100%",
        encryption: "AES-256",
        audits: "24/7"
      }
    },
    {
      id: 4,
      title: "Multi-Language & Accessibility",
      description: "Global accessibility with multi-language support, screen reader compatibility, and WCAG 2.1 AA compliance.",
      icon: "🌍",
      features: [
        "15+ language support",
        "Screen reader compatibility",
        "High contrast mode",
        "Voice navigation support"
      ],
      metrics: {
        languages: "15+",
        accessibility: "WCAG 2.1 AA",
        users: "1M+"
      }
    },
    {
      id: 5,
      title: "Cloud-Native Architecture",
      description: "Scalable cloud infrastructure with microservices architecture, auto-scaling, and global CDN distribution.",
      icon: "☁️",
      features: [
        "Microservices architecture",
        "Auto-scaling capabilities",
        "Global CDN distribution",
        "99.99% uptime SLA"
      ],
      metrics: {
        uptime: "99.99%",
        regions: "12",
        scaling: "Auto"
      }
    },
    {
      id: 6,
      title: "Advanced Reporting & BI",
      description: "Comprehensive business intelligence with custom dashboards, automated reports, and data visualization.",
      icon: "📊",
      features: [
        "Custom dashboard builder",
        "Automated report generation",
        "Interactive data visualization",
        "Real-time analytics"
      ],
      metrics: {
        reports: "50+",
        dashboards: "Unlimited",
        data: "Real-time"
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveFeature((prev) => (prev + 1) % industryFeatures.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [industryFeatures.length]);

  const handleFeatureClick = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveFeature(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="industry-features">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>🏭 Industry-Grade Features</span>
          </div>
          <h2 className="section-title">
            Enterprise-Ready Healthcare Technology
          </h2>
          <p className="section-subtitle">
            Built for hospitals, clinics, and healthcare systems of any size. 
            Scalable, secure, and designed for the future of healthcare.
          </p>
        </div>

        <div className="features-showcase">
          <div className="feature-navigation">
            {industryFeatures.map((feature, index) => (
              <button
                key={feature.id}
                className={`nav-item ${activeFeature === index ? 'active' : ''}`}
                onClick={() => handleFeatureClick(index)}
              >
                <span className="nav-icon">{feature.icon}</span>
                <span className="nav-title">{feature.title}</span>
              </button>
            ))}
          </div>

          <div className="feature-content">
            <div className={`feature-display ${isAnimating ? 'animating' : ''}`}>
              <div className="feature-main">
                <div className="feature-header">
                  <div className="feature-icon">{industryFeatures[activeFeature].icon}</div>
                  <div className="feature-info">
                    <h3>{industryFeatures[activeFeature].title}</h3>
                    <p>{industryFeatures[activeFeature].description}</p>
                  </div>
                </div>

                <div className="feature-details">
                  <div className="feature-list">
                    <h4>Key Capabilities</h4>
                    <ul>
                      {industryFeatures[activeFeature].features.map((item, index) => (
                        <li key={index}>
                          <span className="check-icon">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="feature-metrics">
                    <h4>Performance Metrics</h4>
                    <div className="metrics-grid">
                      {Object.entries(industryFeatures[activeFeature].metrics).map(([key, value], index) => (
                        <div key={index} className="metric-item">
                          <span className="metric-value">{value}</span>
                          <span className="metric-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-visual">
                <div className="visual-container">
                  <div className="visual-element">
                    <div className="data-flow">
                      <div className="flow-node active"></div>
                      <div className="flow-node"></div>
                      <div className="flow-node"></div>
                      <div className="flow-node"></div>
                    </div>
                    <div className="data-lines">
                      <div className="line active"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                  <div className="visual-stats">
                    <div className="stat-bubble">
                      <span className="stat-number">99.9%</span>
                      <span className="stat-text">Uptime</span>
                    </div>
                    <div className="stat-bubble">
                      <span className="stat-number">2ms</span>
                      <span className="stat-text">Latency</span>
                    </div>
                    <div className="stat-bubble">
                      <span className="stat-number">1M+</span>
                      <span className="stat-text">Users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="enterprise-benefits">
          <h3>Why Leading Hospitals Choose DocTracker</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🏥</div>
              <h4>Hospital-Grade Security</h4>
              <p>Enterprise security standards with SOC 2 Type II certification and HIPAA compliance.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h4>Proven ROI</h4>
              <p>Average 40% reduction in wait times and 25% increase in patient satisfaction scores.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔧</div>
              <h4>Easy Integration</h4>
              <p>Seamless integration with existing EHR systems and hospital infrastructure.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌐</div>
              <h4>Global Scale</h4>
              <p>Deployed in 50+ countries with multi-language support and local compliance.</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <h3>Ready to Transform Your Healthcare Operations?</h3>
            <p>Join 500+ hospitals worldwide using DocTracker to improve patient care and operational efficiency.</p>
            <div className="cta-buttons">
              <button className="cta-button primary">
                <span>Schedule Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="cta-button secondary">
                <span>Download Whitepaper</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryFeatures;
