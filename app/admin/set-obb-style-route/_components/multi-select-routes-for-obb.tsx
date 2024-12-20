"use client"

import { useState } from "react";
import { toast } from "react-hot-toast";

import SelectableOptionCard from "./selectable-option-card";
import { ObbSheetRoute } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { formatRoutes } from "../_actions/format-routes";

interface MultiSelectRoutesForObbProps {
    route: ObbSheetRoute | null;
    obbSheetId: string;
}

const MultiSelectRoutesForObb = ({
    route,
    obbSheetId,
}: MultiSelectRoutesForObbProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [routes, setRoutes] = useState(formatRoutes(route));

    const handleToggleExperience = (data: any) => {
        const updatedRoutes = routes.map(route =>
            route.slug === data.slug ? { ...route, isActive: !data.isActive } : route
        );

        setRoutes(updatedRoutes);
    };

    const handleUpdate = async () => {
        setIsLoading(true);

        try {
            // Construct the payload
            const payload = {
                obbSheetId,
                routes: routes.map((route) => ({
                    slug: route.slug,
                    isActive: route.isActive,
                })),
            };

            // Make API call to update the database
            const response = await fetch("/api/admin/obb-style-route", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                toast.error("Failed to update the routes");
                throw new Error("Failed to update the routes");
            }

            toast.success("Routes updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the routes");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-2 flex justify-between items-end">
                <h2 className="text-xl font-medium text-slate-700">Style-wise Process Flow</h2>
                <Button size="sm" onClick={handleUpdate} disabled={isLoading}>
                    Update
                </Button>
            </div>
            <hr />
            <div className="mt-6 grid grid-cols-3 md:grid-cols-4 gap-4">
                {routes.map(data => (
                    <div
                        key={data.slug}
                        className="cursor-pointer"
                        onClick={() => handleToggleExperience(data)}
                    >
                        <SelectableOptionCard
                            label={data.label}
                            position={data.position}
                            isSelected={data.isActive}
                        />
                    </div>
                ))}
            </div>
            <p className="mt-4 text-center text-sm text-slate-400">Please tick the card to activate the scanning points</p>
        </div>
    )
}

export default MultiSelectRoutesForObb