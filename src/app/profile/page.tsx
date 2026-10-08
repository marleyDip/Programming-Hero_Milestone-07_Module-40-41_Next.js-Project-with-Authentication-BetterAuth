"use client";

import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  ImageIcon,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  Pencil,
  Save,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type ActiveSection = "profile" | "email" | "password";

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  showPassword,
  setShowPassword,
  disabled,
  name,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  disabled: boolean;
  name: string;
}) => (
  <div className="relative">
    <LockKeyhole className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />

    <input
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="form-input-danger pr-12!"

      // className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pr-12 pl-11 text-sm font-medium text-neutral-900 outline-none transition-all placeholder:text-neutral-400 focus:border-danger focus:bg-white focus:ring-4 focus:ring-danger/10 disabled:cursor-not-allowed disabled:opacity-60"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      disabled={disabled}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 disabled:cursor-not-allowed"
    >
      {showPassword ? (
        <EyeOff className="size-4" />
      ) : (
        <Eye className="size-4" />
      )}
    </button>
  </div>
);

const ProfilePage = () => {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const user = session?.user;
  const profileName = user?.name ?? "";
  const profileImage = user?.image ?? "";
  const profileEmail = user?.email ?? "";

  const [activeSection, setActiveSection] = useState<ActiveSection>("profile");

  const [name, setName] = useState(profileName);
  const [image, setImage] = useState(profileImage);

  const [newEmail, setNewEmail] = useState(profileEmail);

  const [syncedProfile, setSyncedProfile] = useState({
    name: profileName,
    image: profileImage,
    email: profileEmail,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (
    user &&
    (syncedProfile.name !== profileName ||
      syncedProfile.image !== profileImage ||
      syncedProfile.email !== profileEmail)
  ) {
    setSyncedProfile({
      name: profileName,
      image: profileImage,
      email: profileEmail,
    });
    setName(profileName);
    setImage(profileImage);
    setNewEmail(profileEmail);
  }

  const initials = !user?.name
    ? "BN"
    : user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

  /* Update Name, Image */
  const handleUpdateProfile = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setIsUpdatingProfile(true);

    const toastId = toast.loading("Updating your profile...");

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "Unable to update your profile.", {
          id: toastId,
          icon: <XCircle className="size-5" />,
        });

        return;
      }

      toast.success("Profile updated successfully.", {
        id: toastId,
        icon: <CheckCircle2 className="size-5" />,
      });
    } catch (error) {
      console.error("Profile update failed:", error);

      toast.error("Something went wrong. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  /* Email Change */
  const handleChangeEmail = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const email = newEmail.trim().toLowerCase();

    if (!email) {
      toast.error("Please enter your new email address.");
      return;
    }

    if (email === user?.email?.toLowerCase()) {
      toast.error("This is already your current email.");
      return;
    }

    setIsChangingEmail(true);

    const toastId = toast.loading("Requesting email change...");

    try {
      const { error } = await authClient.changeEmail({
        newEmail: email,
        callbackURL: "/profile",
      });

      if (error) {
        toast.error(error.message || "Unable to change your email.", {
          id: toastId,
          icon: <XCircle className="size-5" />,
        });

        return;
      }

      toast.success(
        "Verification email sent. Check your inbox to confirm the change.",
        {
          id: toastId,
          icon: <CheckCircle2 className="size-5" />,
          duration: 5000,
        },
      );
    } catch (error) {
      console.error("Email change failed:", error);

      toast.error("Something went wrong. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsChangingEmail(false);
    }
  };

  /* Password Change */
  const handleChangePassword = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter your new password.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Your new password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("Your new password must be different.");
      return;
    }

    setIsChangingPassword(true);

    const toastId = toast.loading("Updating your password...");

    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Unable to change your password.", {
          id: toastId,
          icon: <XCircle className="size-5" />,
        });

        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success(
        "Password changed successfully. Other sessions were signed out.",
        {
          id: toastId,
          icon: <CheckCircle2 className="size-5" />,
          duration: 5000,
        },
      );
    } catch (error) {
      console.error("Password change failed:", error);

      toast.error("Something went wrong. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  /* Signout */
  const handleSignOut = async () => {
    setIsSigningOut(true);

    const toastId = toast.loading("Signing you out...");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to sign out.", {
          id: toastId,
          icon: <XCircle className="size-5" />,
        });

        return;
      }

      toast.success("Signed out successfully.", {
        id: toastId,
        icon: <CheckCircle2 className="size-5" />,
      });
    } catch (error) {
      console.error("Sign out failed:", error);

      toast.error("Something went wrong.", {
        id: toastId,
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  /* Session */
  if (isSessionLoading) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="mb-8 h-10 w-40 rounded-xl bg-neutral-200" />

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="h-80 rounded-3xl bg-neutral-200" />

            <div className="h-125 rounded-3xl bg-neutral-200" />
          </div>
        </div>
      </main>
    );
  }

  /* Redirect to Sign In Page */
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-xl shadow-black/5">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            <UserRound className="size-6" />
          </div>

          <h1 className="text-2xl font-black text-neutral-950">
            Sign in required
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Please sign in to access your profile and account settings.
          </p>

          <Link
            href="/signin"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-neutral-950 px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-danger"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-neutral-500 transition-colors hover:text-danger"
          >
            <ArrowLeft className="size-4" />
            Back to Bangla News 24
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-danger" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-danger">
                  Account Center
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
                Account Settings
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                Manage your profile, email address, and password from one secure
                place.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 text-xs font-bold text-red-600 transition-all hover:border-red-200 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningOut ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogOut className="size-4" />
              )}

              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Profile summary / Navigation */}
          <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]">
            <div className="mb-6 text-center">
              <div className="relative mx-auto mb-4 size-24">
                <div className="relative size-full overflow-hidden rounded-[28px] bg-neutral-950 ring-4 ring-danger/10">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-2xl font-black text-white">
                      {initials}
                    </div>
                  )}
                </div>

                <span className="absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full border-4 border-white bg-emerald-500">
                  <CheckCircle2 className="size-3.5 text-white" />
                </span>
              </div>

              <h2 className="truncate text-lg font-black text-neutral-950">
                {user.name}
              </h2>

              <p className="mt-1 truncate text-xs font-medium text-neutral-400">
                {user.email}
              </p>
            </div>

            <nav className="space-y-1.5">
              <button
                type="button"
                onClick={() => setActiveSection("profile")}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-all ${
                  activeSection === "profile"
                    ? "bg-danger text-white shadow-lg shadow-danger/20"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950"
                }`}
              >
                <UserRound className="size-4" />
                Profile
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("email")}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-all ${
                  activeSection === "email"
                    ? "bg-danger text-white shadow-lg shadow-danger/20"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950"
                }`}
              >
                <Mail className="size-4" />
                Email Address
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("password")}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-all ${
                  activeSection === "password"
                    ? "bg-danger text-white shadow-lg shadow-danger/20"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950"
                }`}
              >
                <KeyRound className="size-4" />
                Password
              </button>
            </nav>

            {/* Security box */}
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-emerald-700">
                <ShieldCheck className="size-4" />
                <span className="text-xs font-black uppercase tracking-wide">
                  Account Security
                </span>
              </div>

              <p className="text-[11px] leading-5 text-emerald-700/80">
                Keep your email verified and use a strong, unique password to
                protect your account.
              </p>
            </div>
          </aside>

          {/* Main content */}
          <section className="rounded-3xl border border-neutral-200 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]">
            {/* Profile */}
            {activeSection === "profile" && (
              <div className="p-6 sm:p-8">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Pencil className="size-4 text-danger" />
                      <span className="text-xs font-black uppercase tracking-wider text-danger">
                        Personal Information
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-neutral-950">
                      Edit your profile
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      Update the information displayed on your account.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold text-neutral-700"
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <UserRound className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Your full name"
                        disabled={isUpdatingProfile}
                        className="form-input-danger"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="mb-2 block text-xs font-bold text-neutral-700"
                    >
                      Profile image URL
                    </label>

                    <div className="relative">
                      <ImageIcon className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />

                      <input
                        id="image"
                        name="image"
                        type="url"
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        disabled={isUpdatingProfile}
                        className="form-input-danger"
                      />
                    </div>

                    <p className="mt-2 text-[11px] text-neutral-400">
                      Use a publicly accessible image URL.
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="flex items-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-neutral-950">
                      {image ? (
                        <Image
                          src={image}
                          alt="Profile preview"
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center font-black text-white">
                          {initials}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-wide text-neutral-400">
                        Preview
                      </p>
                      <p className="mt-1 truncate text-sm font-bold text-neutral-800">
                        {name || "Your name"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-6 text-sm font-bold text-white shadow-lg shadow-neutral-950/10 transition-all hover:-translate-y-0.5 hover:bg-danger hover:shadow-danger/20 active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                    >
                      {isUpdatingProfile ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="size-4" />
                          Save changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Email */}
            {activeSection === "email" && (
              <div className="p-6 sm:p-8">
                <div className="mb-8">
                  <div className="mb-2 flex items-center gap-2">
                    <Mail className="size-4 text-danger" />
                    <span className="text-xs font-black uppercase tracking-wider text-danger">
                      Email Settings
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-neutral-950">
                    Change email address
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Your email is used for authentication and important account
                    notifications.
                  </p>
                </div>

                <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-blue-600" />

                    <div>
                      <p className="text-sm font-bold text-blue-900">
                        Verification required
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        After requesting a new email address, Better Auth can
                        send a verification link. Your email changes after the
                        verification step is completed.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleChangeEmail} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-neutral-700">
                      Current email
                    </label>

                    <div className="flex h-12 items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-100 px-4">
                      <Mail className="size-4 text-neutral-400" />

                      <span className="truncate text-sm font-semibold text-neutral-500">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="newEmail"
                      className="mb-2 block text-xs font-bold text-neutral-700"
                    >
                      New email address
                    </label>

                    <div className="relative">
                      <Mail className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />

                      <input
                        id="newEmail"
                        type="email"
                        value={newEmail}
                        onChange={(event) => setNewEmail(event.target.value)}
                        placeholder="you@example.com"
                        disabled={isChangingEmail}
                        className="form-input-danger"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="submit"
                      disabled={isChangingEmail}
                      className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-6 text-sm font-bold text-white shadow-lg shadow-neutral-950/10 transition-all hover:-translate-y-0.5 hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isChangingEmail ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="size-4" />
                          Change email
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Password */}
            {activeSection === "password" && (
              <div className="p-6 sm:p-8">
                <div className="mb-8">
                  <div className="mb-2 flex items-center gap-2">
                    <KeyRound className="size-4 text-danger" />
                    <span className="text-xs font-black uppercase tracking-wider text-danger">
                      Security
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-neutral-950">
                    Change your password
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Choose a strong password that you don&apos;t use elsewhere.
                  </p>
                </div>

                <div className="mb-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                    <LockKeyhole className="mb-3 size-5 text-neutral-700" />
                    <p className="text-xs font-bold text-neutral-800">
                      Current password
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-400">
                      Verify your identity
                    </p>
                  </div>

                  <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                    <KeyRound className="mb-3 size-5 text-neutral-700" />
                    <p className="text-xs font-bold text-neutral-800">
                      New password
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-400">
                      Minimum 8 characters
                    </p>
                  </div>

                  <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
                    <ShieldCheck className="mb-3 size-5 text-neutral-700" />
                    <p className="text-xs font-bold text-neutral-800">
                      Other sessions
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-400">
                      Will be signed out
                    </p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-5">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="mb-2 block text-xs font-bold text-neutral-700"
                    >
                      Current password
                    </label>

                    <PasswordInput
                      name="currentPassword"
                      value={currentPassword}
                      onChange={setCurrentPassword}
                      placeholder="Enter your current password"
                      showPassword={showCurrentPassword}
                      setShowPassword={setShowCurrentPassword}
                      disabled={isChangingPassword}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block text-xs font-bold text-neutral-700"
                    >
                      New password
                    </label>

                    <PasswordInput
                      name="newPassword"
                      value={newPassword}
                      onChange={setNewPassword}
                      placeholder="Enter your new password"
                      showPassword={showNewPassword}
                      setShowPassword={setShowNewPassword}
                      disabled={isChangingPassword}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-xs font-bold text-neutral-700"
                    >
                      Confirm new password
                    </label>

                    <PasswordInput
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="Confirm your new password"
                      showPassword={showConfirmPassword}
                      setShowPassword={setShowConfirmPassword}
                      disabled={isChangingPassword}
                    />
                  </div>

                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-xs font-bold text-amber-900">
                      Security note
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-amber-700">
                      Changing your password will sign out your other active
                      sessions for better account security.
                    </p>
                  </div>

                  <div className="flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-6 text-sm font-bold text-white shadow-lg shadow-neutral-950/10 transition-all hover:-translate-y-0.5 hover:bg-danger hover:shadow-danger/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                    >
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="size-4" />
                          Update password
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

// "use client";

// import { authClient } from "@/lib/auth-client";
// import { useState } from "react";

// const ProfilePage = () => {
//   const { data: session } = authClient.useSession();

//   const user = session?.user;

//   const [show, setShow] = useState(false);

//   const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const newUserData = Object.fromEntries(formData.entries()) as {
//       name: string;
//       image: string;
//     };

//     await authClient.updateUser({
//       ...newUserData,
//     });
//   };

//   const handleShowForm = () => {
//     setShow(!show);
//   };

//   return <div></div>;
// };

// export default ProfilePage;
