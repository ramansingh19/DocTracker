import React, { useEffect, useState } from 'react';

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
    <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-500/20">🏭 Industry-Grade Features</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Enterprise-Ready Healthcare Technology
          </h2>
          <p className="text-xl text-slate-500 max-w-[800px] mx-auto leading-relaxed">
            Built for hospitals, clinics, and healthcare systems of any size. 
            Scalable, secure, and designed for the future of healthcare.
          </p>
        </div>

        <div className="grid grid-cols-[300px_1fr] gap-12 mb-16 lg:grid-cols-1 lg:gap-8">
          <div className="flex flex-col gap-2 lg:flex-row lg:overflow-x-auto lg:pb-2 lg:gap-2">
            {industryFeatures.map((feature, index) => (
              <button
                key={feature.id}
                className={`flex items-center gap-3 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all duration-300 text-left text-sm font-medium text-gray-700 min-w-0 lg:min-w-[200px] lg:flex-shrink-0 ${activeFeature === index ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 font-semibold' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-500/5 hover:translate-x-1'}`}
                onClick={() => handleFeatureClick(index)}
              >
                <span className="text-2xl w-6 text-center">{feature.icon}</span>
                <span className="flex-1 leading-snug">{feature.title}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-black/5">
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-70 scale-[0.98]' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex-shrink-0">{industryFeatures[activeFeature].icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 m-0 mb-2 leading-snug">{industryFeatures[activeFeature].title}</h3>
                    <p className="text-slate-500 m-0 text-base leading-relaxed">{industryFeatures[activeFeature].description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 m-0 mb-4">Key Capabilities</h4>
                    <ul className="list-none p-0 m-0">
                      {industryFeatures[activeFeature].features.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 py-2 text-sm text-gray-700">
                          <span className="text-emerald-500 font-semibold text-xs">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-gray-900 m-0 mb-4">Performance Metrics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(industryFeatures[activeFeature].metrics).map(([key, value], index) => (
                        <div key={index} className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl border border-gray-200">
                          <span className="block text-2xl font-bold text-gray-900 mb-1">{value}</span>
                          <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-8">
                <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                  <div className="flex flex-col gap-2">
                    {['99.9% Uptime', '2ms Latency', '1M+ Users'].map((s, i) => (
                      <div key={i} className="bg-white border-2 border-gray-200 rounded-full px-4 py-2 text-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] animate-[float_3s_ease-in-out_infinite]">
                        <span className="block text-sm font-bold text-gray-900">{s.split(' ')[0]}</span>
                        <span className="block text-[0.6rem] text-slate-500 font-medium">{s.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Leading Hospitals Choose DocTracker</h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {[
              { icon: '🏥', title: 'Hospital-Grade Security', desc: 'Enterprise security standards with SOC 2 Type II certification and HIPAA compliance.' },
              { icon: '📈', title: 'Proven ROI', desc: 'Average 40% reduction in wait times and 25% increase in patient satisfaction scores.' },
              { icon: '🔧', title: 'Easy Integration', desc: 'Seamless integration with existing EHR systems and hospital infrastructure.' },
              { icon: '🌐', title: 'Global Scale', desc: 'Deployed in 50+ countries with multi-language support and local compliance.' },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
                <div className="text-5xl mb-4">{b.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{b.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed m-0">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 text-center text-white">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Healthcare Operations?</h3>
            <p className="text-blue-100 mb-8 max-w-[600px] mx-auto">Join 500+ hospitals worldwide using DocTracker to improve patient care and operational efficiency.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-0">
                <span>Schedule Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <a href="/Project.pdf" download className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5 no-underline">
                <span>Download WhitePaper</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryFeatures;
