/** @format */

"use client";

import {
    NotificationSettingsFormData,
    notificationSettingsSchema,
} from "@/schemas";
import { UserSettings } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserMutation } from "@/state/userApi";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Header from "./Header";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import clsx from "clsx";

const SharedNotificationSettings = ({
    title = "Notification Settings",
    subtitle = "Manage your notification settings",
}: SharedNotificationSettingsProps) => {
    const { user } = useUser();
    const [updateUser] = useUpdateUserMutation();

    const currentSettings =
        (user?.publicMetadata as { settings?: UserSettings })?.settings || {};

    const methods = useForm<NotificationSettingsFormData>({
        resolver: zodResolver(notificationSettingsSchema),
        defaultValues: {
            pushNotifications: currentSettings.pushNotifications || false,
            emailAlerts: currentSettings.emailAlerts || false,
            smsAlerts: currentSettings.smsAlerts || false,
            notificationFrequency:
                currentSettings.notificationFrequency || "daily",
        },
    });

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const onSubmit = async (data: NotificationSettingsFormData) => {
        if (!user) return;

        const currentMetadata = user.publicMetadata as {
            settings?: UserSettings;
            userType: "admin" | "seller" | "buyer";
        };

        const updatedUser = {
            userId: user.id,
            publicMetadata: {
                ...currentMetadata,
                settings: {
                    ...currentMetadata.settings,
                    ...data,
                },
                userType: currentMetadata.userType, // Ensure userType is included
            },
        };

        try {
            await updateUser(updatedUser);
            console.log("User settings updated:", data);
        } catch (error) {
            console.error("Failed to update user settings: ", error);
        }
    };

    if (!user) return <div>Please sign in to manage your settings.</div>;

    return (
        <div>
            <Header title={title} subtitle={subtitle} />
            <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <Controller
                            control={control}
                            name="pushNotifications"
                            render={({ field }) => (
                                <ToggleField
                                    label="Push Notifications"
                                    field={field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="emailAlerts"
                            render={({ field }) => (
                                <ToggleField
                                    label="Email Alerts"
                                    field={field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="smsAlerts"
                            render={({ field }) => (
                                <ToggleField label="SMS Alerts" field={field} />
                            )}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Notification Frequency
                            </label>
                            <select
                                {...register("notificationFrequency")}
                                className="w-full rounded border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 p-2"
                            >
                                <option value="immediate">Immediate</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="none">None</option>
                            </select>
                            {errors.notificationFrequency && (
                                <p className="text-sm text-red-500">
                                    {errors.notificationFrequency.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-500"
                    >
                        Update Settings
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SharedNotificationSettings;

interface SharedNotificationSettingsProps {
    title?: string;
    subtitle?: string;
}

const ToggleField = ({
    label,
    field,
}: {
    label: string;
    field: {
        value: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
}) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <Switch
            checked={field.value}
            onChange={field.onChange}
            className={clsx(
                field.value ? "bg-blue-600" : "bg-gray-300",
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
            )}
        >
            <span
                className={clsx(
                    field.value ? "translate-x-6" : "translate-x-1",
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                )}
            />
        </Switch>
    </div>
);
