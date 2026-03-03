import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#f5f1ea] pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900">Navi Clothing</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Timeless kurtis crafted for modern women. Designed with comfort,
              elegance, and everyday grace.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/product">New Arrivals</Link>
              </li>
              <li>
                <Link to="/category/daily-wear">Daily Wear</Link>
              </li>
              <li>
                <Link to="/category/festive-wear">Festive Wear</Link>
              </li>
              <li>
                <Link to="/category/office-wear">Office Wear</Link>
              </li>
              <li>
                <Link to="/category/party-wear">Party Wear</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping-policy">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/return-policy">Return Policy</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Connect</h4>
            <p className="text-sm text-gray-600 mb-3">
              support@naviclothing.com
            </p>
            <p className="text-sm text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          © 2026 Navi Clothing. All rights reserved. <br /> Developed by{" "}
          <Link
            to="https://www.arcoders.com/"
            className="text-rose-400 hover:underline"
          >
            Arcoders Digital Solutions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
