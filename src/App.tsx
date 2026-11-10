/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrameWrapper } from './components/common/DeviceFrameWrapper';
import { MobileHeader } from './components/layout/MobileHeader';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { DashboardTab } from './components/dashboard/DashboardTab';
import { ApprovalsTab } from './components/approvals/ApprovalsTab';
import { EventsTab } from './components/events/EventsTab';
import { MeetTab } from './components/meet/MeetTab';
import { DriveTab } from './components/drive/DriveTab';
import { MoreTab } from './components/more/MoreTab';
import { MembersDirectoryScreen } from './components/members/MembersDirectoryScreen';
import { SubscriptionsManagerScreen } from './components/subscriptions/SubscriptionsManagerScreen';
import { DuesLedgerScreen } from './components/financials/DuesLedgerScreen';
import { BillingManagerScreen } from './components/financials/BillingManagerScreen';
import { ChapterSelectorDrawer } from './components/common/ChapterSelectorDrawer';
import { NotificationsSheet } from './components/common/NotificationsSheet';
import { QuickActionsModal } from './components/common/QuickActionsModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

const MainScreen: React.FC = () => {
  const { activeTab, activeSubScreen } = useApp();

  return (
    <DeviceFrameWrapper>
      {/* Top Header with Dynamic Screen Title, Crest, Chapter Selector, and Global Search */}
      <MobileHeader />

      {/* Main Tab Content Viewport */}
      <main className="flex-1 px-4 pt-2 overflow-y-auto">
        {/* Sub-Screens triggered from Dashboard KPI cards */}
        {activeSubScreen === 'members_directory' && <MembersDirectoryScreen />}
        {activeSubScreen === 'subscriptions_manager' && <SubscriptionsManagerScreen />}
        {activeSubScreen === 'dues_ledger' && <DuesLedgerScreen />}
        {activeSubScreen === 'billing_manager' && <BillingManagerScreen />}

        {/* Primary Tab Views */}
        {!activeSubScreen && (
          <>
            {activeTab === 'home' && <DashboardTab />}
            {activeTab === 'approvals' && <ApprovalsTab />}
            {activeTab === 'events' && <EventsTab />}
            {activeTab === 'meet' && <MeetTab />}
            {activeTab === 'drive' && <DriveTab />}
            {activeTab === 'more' && <MoreTab />}
          </>
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <BottomNavigation />

      {/* Global Drawers & Modals */}
      <ChapterSelectorDrawer />
      <NotificationsSheet />
      <QuickActionsModal />
      <GlobalSearchModal />
    </DeviceFrameWrapper>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainScreen />
    </AppProvider>
  );
}
