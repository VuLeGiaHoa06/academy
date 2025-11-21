"use client";

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const footerSections = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Categories",
    links: ["Business", "Design", "Health", "IT & Software"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Documentation", "Community", "API"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Contact"],
  },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
];

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-16">
      <div className="px-[60px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="text-[28px] text-white font-bold mb-[10px]">
              BinVu's Academy
            </p>
            <p className="text-gray-400 text-sm">
              Empowering the next generation of tech leaders.
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <div className="flex flex-col gap-4">
                {section.links.map((link, linkIndex) => (
                  <Link
                    href={"/"}
                    key={linkIndex}
                    className="text-gray-400 hover:text-amber-400 transition text-sm"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2025 BinVu's Academy. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href="#"
                    aria-label={social.label}
                    className="text-gray-400 hover:text-amber-400 transition"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
