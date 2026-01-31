import React, { useEffect, useState } from "react";

const IndustryFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const industryFeatures = [
    {
      id: 1,
      title: "AI-Powered Predictive Analytics",
      description:
        "Machine learning algorithms predict patient flow, optimize scheduling, and identify potential bottlenecks before they occur.",
      icon: "🤖",
      features: [
        "Predictive patient volume forecasting",
        "Intelligent appointment scheduling",
        "Resource optimization recommendations",
        "Early warning system for capacity issues",
      ],
      metrics: {
        accuracy: "94%",
        efficiency: "+35%",
        satisfaction: "+28%",
      },
    },
    {
      id: 2,
      title: "Real-Time IoT Integration",
      description:
        "Seamless integration with IoT devices, wearables, and hospital equipment for comprehensive patient monitoring.",
      icon: "📡",
      features: [
        "Wearable device data integration",
        "Real-time vital signs monitoring",
        "Smart equipment status tracking",
        "Automated emergency alerts",
      ],
      metrics: {
        devices: "500+",
        uptime: "99.9%",
        response: "<2s",
      },
    },
    {
      id: 3,
      title: "Advanced Security & Compliance",
      description:
        "Enterprise-grade security with HIPAA compliance, end-to-end encryption, and comprehensive audit trails.",
      icon: "🔒",
      features: [
        "HIPAA compliant data handling",
        "End-to-end encryption",
        "Multi-factor authentication",
        "Comprehensive audit logging",
      ],
      metrics: {
        compliance: "100%",
        encryption: "AES-256",
        audits: "24/7",
      },
    },
    {
      id: 4,
      title: "Multi-Language & Accessibility",
      description:
        "Global accessibility with multi-language support, screen reader compatibility, and WCAG 2.1 AA compliance.",
      icon: "🌍",
      features: [
        "15+ language support",
        "Screen reader compatibility",
        "High contrast mode",
        "Voice navigation support",
      ],
      metrics: {
        languages: "15+",
        accessibility: "WCAG 2.1 AA",
        users: "1M+",
      },
    },
    {
      id: 5,
      title: "Cloud-Native Architecture",
      description:
        "Scalable cloud infrastructure with microservices architecture, auto-scaling, and global CDN distribution.",
      icon: "☁️",
      features: [
        "Microservices architecture",
        "Auto-scaling capabilities",
        "Global CDN distribution",
        "99.99% uptime SLA",
      ],
      metrics: {
        uptime: "99.99%",
        regions: "12",
        scaling: "Auto",
      },
    },
    {
      id: 6,
      title: "Advanced Reporting & BI",
      description:
        "Comprehensive business intelligence with custom dashboards, automated reports, and data visualization.",
      icon: "📊",
      features: [
        "Custom dashboard builder",
        "Automated report generation",
        "Interactive data visualization",
        "Real-time analytics",
      ],
      metrics: {
        reports: "50+",
        dashboards: "Unlimited",
        data: "Real-time",
      },
    },
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
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Abstract Background Glows */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-600">
              Enterprise Ready
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Healthcare Technology for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Global Scale
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Powering the world's most demanding healthcare environments with
            uncompromising security and real-time precision.
          </p>
        </div>

        {/* Interactive Feature Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 mb-24">
          {/* Sidebar Tabs */}
          <div className="space-y-3">
            {industryFeatures.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(index)}
                className={`w-full group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                  activeFeature === index
                    ? "bg-white border-blue-200 shadow-xl shadow-blue-500/5 translate-x-2"
                    : "bg-transparent border-transparent hover:bg-slate-100 text-slate-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    activeFeature === index
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-500 group-hover:bg-slate-300"
                  }`}
                >
                  {feature.icon}
                </div>
                <span
                  className={`font-bold tracking-tight ${activeFeature === index ? "text-blue-600" : "text-slate-700"}`}
                >
                  {feature.title}
                </span>
              </button>
            ))}
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            {/* Subtle Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div
              className={`relative z-10 transition-all duration-500 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-6 uppercase text-[10px] font-black tracking-widest border border-blue-100">
                    Core Module
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    {industryFeatures[activeFeature].title}
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    {industryFeatures[activeFeature].description}
                  </p>

                  <div className="space-y-4">
                    {industryFeatures[activeFeature].features.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-slate-700 font-medium"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                    Performance benchmarks
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(
                      industryFeatures[activeFeature].metrics,
                    ).map(([key, value], i) => (
                      <div
                        key={i}
                        className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex justify-between items-center group hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all"
                      >
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="text-3xl font-black text-slate-900">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: "🏥",
              title: "SOC2 Type II",
              desc: "Enterprise security standards.",
            },
            {
              icon: "📈",
              title: "40% Efficiency",
              desc: "Average reduction in wait times.",
            },
            {
              icon: "🔧",
              title: "Native HL7/FHIR",
              desc: "Seamless EHR integration.",
            },
            {
              icon: "🌐",
              title: "Global Edge",
              desc: "Deployed in 50+ countries.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-200 bg-white/50 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {b.icon}
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{b.title}</h4>
              <p className="text-sm text-slate-500 leading-snug">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Modern CTA Card */}
        <div className="relative rounded-[40px] bg-slate-900 p-12 overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to upgrade your care?
              </h3>
              <p className="text-slate-400 text-lg">
                Join 500+ hospitals worldwide using DocTracker to redefine
                patient experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-lg shadow-blue-600/20">
                Schedule Demo
              </button>
              <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-all">
                Technical Specs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryFeatures;
