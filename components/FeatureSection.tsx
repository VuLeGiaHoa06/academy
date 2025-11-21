"use client"

import { BookOpen, Users, Award, Clock } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Learn at Your Pace",
    description:
      "Access all course materials anytime, anywhere. Study on your own schedule with lifetime access to content.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience in their respective fields.",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn recognized certificates of completion to showcase your new skills to employers and peers.",
  },
  {
    icon: Clock,
    title: "Flexible Support",
    description: "Get help when you need it. Our community and instructors are here to support your learning journey.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose Tech Vision Academy?</h2>
          <p className="text-xl text-gray-600">
            We provide comprehensive learning experiences designed to transform your career in technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-8 bg-white rounded-lg border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all"
              >
                <Icon className="text-amber-500 mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
