"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>RA</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Rahul Agarwal</p>
          <p className="text-sm text-muted-foreground">
            Loan repayment
          </p>
        </div>
        <div className="ml-auto font-medium">+₹5,000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Priya Reddy</p>
          <p className="text-sm text-muted-foreground">Shop rent</p>
        </div>
        <div className="ml-auto font-medium">+₹15,000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Amit Kumar</p>
          <p className="text-sm text-muted-foreground">
            New loan
          </p>
        </div>
        <div className="ml-auto font-medium">-₹50,000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sanjay Dutt</p>
          <p className="text-sm text-muted-foreground">
            Loan repayment
          </p>
        </div>
        <div className="ml-auto font-medium">+₹3,000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>NP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Neha Patel</p>
          <p className="text-sm text-muted-foreground">
            Shop rent
          </p>
        </div>
        <div className="ml-auto font-medium">+₹12,000</div>
      </div>
    </div>
  )
}

