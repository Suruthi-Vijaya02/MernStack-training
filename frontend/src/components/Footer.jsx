import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-forest text-cream p-8 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Brand & About */}
        <div>
          <h2 className="text-xl font-bold mb-3">Fresh Farm</h2>
          <p className="text-sm opacity-80">
            Bringing freshness to your home with a wide selection of plants, seeds, and gardening essentials.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#plants" className="hover:underline">Plants</a></li>
            <li><a href="#seeds" className="hover:underline">Seeds</a></li>
            <li><a href="#essentials" className="hover:underline">Essentials</a></li>
            <li><a href="#flowers" className="hover:underline">Flowers</a></li>
          </ul>
        </div>

        {/* Column 3: Contact & Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Email: support@freshfarm.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Location: Green Valley, Earth</li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-cream/20 mt-8 pt-4 text-center text-sm opacity-70">
        <p>&copy; {new Date().getFullYear()} Fresh Farm. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;