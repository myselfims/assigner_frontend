import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Section 1: About */}
          <div>
            <h3 className="text-lg font-bold mb-2">About EasyAssigns</h3>
            <p className="text-sm">
              EasyAssigns is a powerful task management platform designed to
              streamline workflows, enhance productivity, and simplify team
              collaboration.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/support" className="hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Rights */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-2">Rights</h3>
            <p className="text-sm">© 2025 All rights reserved by EasyAssigns.</p>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-blue-800 mt-6 pt-4 text-center text-sm">
          Designed with ❤️ by EasyAssigns Team.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
