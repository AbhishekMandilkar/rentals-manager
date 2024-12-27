"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Jan", occupied: 12, vacant: 3 },
  { name: "Feb", occupied: 13, vacant: 2 },
  { name: "Mar", occupied: 14, vacant: 1 },
  { name: "Apr", occupied: 14, vacant: 1 },
  { name: "May", occupied: 15, vacant: 0 },
  { name: "Jun", occupied: 15, vacant: 0 },
]

export function RentalOccupancy() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="occupied" stackId="a" fill="#8884d8" />
        <Bar dataKey="vacant" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

