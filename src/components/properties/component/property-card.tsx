"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Property } from "../useProperties";

interface PropertyCardProps {
  property: Property;
  onUpdate: (property: Omit<Property, "active">) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

export function PropertyCard({
  property,
  onUpdate,
  disabled,
}: PropertyCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(property.name);
  const [isActive, setIsActive] = useState(property.active);

  const handleSave = () => {
    onUpdate({ id: property.id, name: editedName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(property.name);
    setIsActive(property.active);
    setIsEditing(false);
  };

  //   const handleDelete = () => {
  //     if (window.confirm('Are you sure you want to delete this property?')) {
  //       onDelete(property.id)
  //     }
  //   }

  return (
    <Card
      className={cn(
        "shadow-sm transition-all duration-200 py-2 px-1 my-2",
        isEditing ? "border-2 border-primary" : "hover:shadow-md"
      )}
    >
      <CardHeader className="p-2 pb-0 pt-0">
        <CardTitle className="font-geist flex items-center justify-between space-x-1">
          {isEditing ? (
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1"
              autoFocus
            />
          ) : (
            <span className="font-medium font-geist">{property.name}</span>
          )}
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                disabled={disabled}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge
              className={cn(
                "text-xs font-geist-mono",
                isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              )}
            >
              {isActive ? "Rented" : "Available"}
            </Badge>
          </div>
          {/* {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
