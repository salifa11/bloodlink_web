import React, { useState } from 'react';
import { Droplet, Users, Activity, AlertCircle, Phone, MapPin } from 'lucide-react';

export default function BloodBankDashboard() {
  const [bloodInventory] = useState([
    { type: 'A+', units: 45, status: 'good' },
    { type: 'A-', units: 12, status: 'low' },
    { type: 'B+', units: 38, status: 'good' },
    { type: 'B-', units: 8, status: 'critical' },
    { type: 'AB+', units: 22, status: 'good' },
    { type: 'AB-', units: 6, status: 'critical' },
    { type: 'O+', units: 52, status: 'good' },
    { type: 'O-', units: 15, status: 'low' }
  ]);

  const [recentDonors] = useState([
    { name: 'John Smith', bloodType: 'O+', date: '2026-01-08', time: '10:30 AM' },
    { name: 'Sarah Johnson', bloodType: 'A+', date: '2026-01-08', time: '11:15 AM' },
    { name: 'Mike Davis', bloodType: 'B-', date: '2026-01-07', time: '2:45 PM' },
    { name: 'Emily Brown', bloodType: 'AB+', date: '2026-01-07', time: '4:20 PM' }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Droplet className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Blood Bank Dashboard</h1>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Emergency: 911</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>City Hospital</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Units</p>
                <p className="text-3xl font-bold text-gray-800">198</p>
              </div>
              <Droplet className="w-12 h-12 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Donors Today</p>
                <p className="text-3xl font-bold text-gray-800">24</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Requests</p>
                <p className="text-3xl font-bold text-gray-800">12</p>
              </div>
              <Activity className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Critical Alert</p>
                <p className="text-3xl font-bold text-gray-800">2</p>
              </div>
              <AlertCircle className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blood Inventory */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Blood Inventory</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {bloodInventory.map((blood) => (
                  <div key={blood.type} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-red-600">{blood.type}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(blood.status)}`}>
                        {blood.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Units Available</p>
                    <p className="text-2xl font-bold text-gray-800">{blood.units}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Donors */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Recent Donors</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentDonors.map((donor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <Droplet className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{donor.name}</p>
                        <p className="text-sm text-gray-500">{donor.date} at {donor.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                        {donor.bloodType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                View All Donors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}