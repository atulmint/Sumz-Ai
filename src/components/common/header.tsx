import { BadgeCheck, FileText } from 'lucide-react';
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import PlanBadge from './plan-badge';
import Image from 'next/image';

export default function Header() {

    return (
        <nav className="container flex items-center justify-between
        py-4 lg: px - 8 px - 2 mx - auto" cy-data="header">
            <div className="flex lg:flex-1" cy-data="logo-container">
                <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0" cy-data="home-link">
                    <Image
                        src={"/SumaristaAI-logo.webp"}
                        alt="SumzAI Logo"
                        width={40}
                        height={40}
                        className='shadow-lg rounded-lg'
                        cy-data="logo-image"
                    />
                </NavLink>
            </div>
            <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center" cy-data="nav-links">
                <NavLink href="/#pricing" cy-data="pricing-link">Pricing</NavLink>
                <SignedIn>
                    <NavLink href="/dashboard" cy-data="dashboard-link">Your summaries</NavLink>
                </SignedIn>
            </div>
            <div className="flex lg:flex-1 lg:justify-end" cy-data="auth-section">
                <SignedIn>
                    <div className="flex gap-2 items-center" cy-data="signed-in-section">
                        <NavLink href="/upload" cy-data="upload-link">Upload PDF</NavLink>
                        <PlanBadge cy-data="plan-badge" />
                        <SignedIn>
                            <UserButton cy-data="user-button" />
                        </SignedIn>
                    </div>
                </SignedIn>

                <SignedOut>
                    <NavLink href="/sign-in" cy-data="sign-in-link">Sign In</NavLink>
                </SignedOut>
            </div>
        </nav>
    );
}
