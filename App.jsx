import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard, BookOpen, Users, ArrowLeftRight, RotateCcw, Bookmark,
  Wallet, Tags, ChartNoAxesCombined, Settings, HelpCircle, Search, Bell,
  ChevronDown, Menu, X, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  CalendarDays, Download, BookMarked, Clock3, CheckCircle2, AlertCircle,
  Languages, Moon, Sun, LibraryBig, LogOut, UserRound, ChevronRight
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell
} from 'recharts';

const monthlyData = [
  { month: 'Jan', issued: 280, returned: 220 },
  { month: 'Feb', issued: 340, returned: 290 },
  { month: 'Mar', issued: 310, returned: 260 },
  { month: 'Apr', issued: 420, returned: 350 },
  { month: 'May', issued: 380, returned: 320 },
  { month: 'Jun', issued: 490, returned: 410 },
  { month: 'Jul', issued: 450, returned: 390 },
  { month: 'Aug', issued: 560, returned: 470 },
  { month: 'Sep', issued: 510, returned: 440 },
  { month: 'Oct', issued: 620, returned: 520 },
  { month: 'Nov', issued: 580, returned: 500 },
  { month: 'Dec', issued: 680, returned: 590 }
];

const categoryData = [
  { name: 'Fiction', value: 35, color: '#176b45' },
  { name: 'Science', value: 25, color: '#77ae8b' },
  { name: 'History', value: 18, color: '#e5b86c' },
  { name: 'Technology', value: 14, color: '#7296bd' },
  { name: 'Others', value: 8, color: '#c9d6cd' }
];

const books = [
  { title: 'The Alchemist', author: 'Paulo Coelho', id: 'BK-2024-001', category: 'Fiction', status: 'Available', cover: '📘', color: 'mint', copies: '12 / 15' },
  { title: 'Atomic Habits', author: 'James Clear', id: 'BK-2024-002', category: 'Self Help', status: 'Borrowed', cover: '📗', color: 'peach', copies: '04 / 10' },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', id: 'BK-2024-003', category: 'Science', status: 'Available', cover: '📙', color: 'blue', copies: '08 / 10' },
  { title: 'Clean Code', author: 'Robert C. Martin', id: 'BK-2024-004', category: 'Technology', status: 'Low Stock', cover: '📕', color: 'lavender', copies: '02 / 08' }
];

const transactions = [
  { initials: 'AR', name: 'Ahmed Rahman', id: 'MB-1024', book: 'The Alchemist', date: '25 Nov, 2026', due: '09 Dec, 2026', status: 'Issued', color: 'green' },
  { initials: 'SN', name: 'Sara Nawar', id: 'MB-1025', book: 'Atomic Habits', date: '24 Nov, 2026', due: '08 Dec, 2026', status: 'Returned', color: 'purple' },
  { initials: 'MH', name: 'Mahmud Hasan', id: 'MB-1026', book: 'Clean Code', date: '23 Nov, 2026', due: '07 Dec, 2026', status: 'Overdue', color: 'orange' },
  { initials: 'FA', name: 'Fatima Akter', id: 'MB-1027', book: 'The Psychology of Money', date: '22 Nov, 2026', due: '06 Dec, 2026', status: 'Issued', color: 'blue' }
];

const copy = {
  en: {
    dashboard: 'Dashboard', books: 'Book Management', members: 'Members', issue: 'Issue & Return',
    reservations: 'Reservations', fines: 'Fine Management', categories: 'Categories & Authors',
    reports: 'Reports & Analytics', settings: 'Settings', support: 'Help & Support',
    overview: 'Overview', welcome: 'Welcome back, Admin 👋', subtitle: "Here's what's happening in your library today.",
    today: 'Today, 25 November 2026', totalBooks: 'Total Books', available: 'Available Books',
    borrowed: 'Borrowed Books', membersCount: 'Total Members', fromLast: 'vs last month',
    borrowing: 'Borrowing Activity', borrowingSub: 'Monthly issue and return overview',
    thisYear: 'This Year', issued: 'Books Issued', returned: 'Books Returned',
    categoriesTitle: 'Book Categories', categoriesSub: 'Distribution by category',
    popular: 'Popular Books', viewAll: 'View all', recent: 'Recent Transactions',
    recentSub: 'Latest book issue and return activities', book: 'Book', member: 'Member',
    issueDate: 'Issue Date', dueDate: 'Due Date', status: 'Status', action: 'Action',
    activities: 'Recent Activities', quick: 'Quick Actions', addBook: 'Add New Book',
    addMember: 'Register Member', issueBook: 'Issue a Book', makeReport: 'Generate Report',
    search: 'Search books, members, ISBN...', all: 'All'
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড', books: 'বই ব্যবস্থাপনা', members: 'সদস্য', issue: 'বই প্রদান ও ফেরত',
    reservations: 'বুকিং ব্যবস্থাপনা', fines: 'জরিমানা ব্যবস্থাপনা', categories: 'বিভাগ ও লেখক',
    reports: 'রিপোর্ট ও বিশ্লেষণ', settings: 'সেটিংস', support: 'সহায়তা',
    overview: 'সারসংক্ষেপ', welcome: 'স্বাগতম, অ্যাডমিন 👋', subtitle: 'আজ আপনার লাইব্রেরির কার্যক্রমের সারসংক্ষেপ।',
    today: 'আজ, ২৫ নভেম্বর ২০২৬', totalBooks: 'মোট বই', available: 'উপলব্ধ বই',
    borrowed: 'ধার দেওয়া বই', membersCount: 'মোট সদস্য', fromLast: 'গত মাসের তুলনায়',
    borrowing: 'বই ধার দেওয়ার কার্যক্রম', borrowingSub: 'মাসভিত্তিক বই প্রদান ও ফেরতের হিসাব',
    thisYear: 'এই বছর', issued: 'বই প্রদান', returned: 'বই ফেরত',
    categoriesTitle: 'বইয়ের বিভাগ', categoriesSub: 'বিভাগ অনুযায়ী বইয়ের বণ্টন',
    popular: 'জনপ্রিয় বই', viewAll: 'সব দেখুন', recent: 'সাম্প্রতিক লেনদেন',
    recentSub: 'সর্বশেষ বই প্রদান ও ফেরতের কার্যক্রম', book: 'বই', member: 'সদস্য',
    issueDate: 'প্রদানের তারিখ', dueDate: 'ফেরতের তারিখ', status: 'অবস্থা', action: 'অ্যাকশন',
    activities: 'সাম্প্রতিক কার্যক্রম', quick: 'দ্রুত কাজ', addBook: 'নতুন বই যোগ করুন',
    addMember: 'সদস্য নিবন্ধন', issueBook: 'বই প্রদান করুন', makeReport: 'রিপোর্ট তৈরি',
    search: 'বই, সদস্য বা ISBN খুঁজুন...', all: 'সব'
  }
};

function StatCard({ icon: Icon, label, value, change, trend, tone, detail }) {
  return <div className="stat-card">
    <div className="stat-top">
      <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
      <button className="icon-button subtle" aria-label="More options"><MoreHorizontal size={19}/></button>
    </div>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-bottom">
      <span className={`trend ${trend === 'down' ? 'negative' : ''}`}>
        {trend === 'down' ? <ArrowDownRight size={15}/> : <ArrowUpRight size={15}/>}
        {change}
      </span>
      <span className="stat-detail">{detail}</span>
    </div>
  </div>;
}

function App() {
  const [language, setLanguage] = useState('en');
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [search, setSearch] = useState('');
  const t = copy[language];
  const filteredBooks = useMemo(() => books.filter(b =>
    `${b.title} ${b.author} ${b.id} ${b.category}`.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  const navGroups = [
    { title: 'MENU', items: [
      { key: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
      { key: 'books', label: t.books, icon: BookOpen, count: '2.4k' },
      { key: 'members', label: t.members, icon: Users },
      { key: 'issue', label: t.issue, icon: ArrowLeftRight },
      { key: 'reservations', label: t.reservations, icon: Bookmark }
    ]},
    { title: 'MANAGEMENT', items: [
      { key: 'fines', label: t.fines, icon: Wallet },
      { key: 'categories', label: t.categories, icon: Tags },
      { key: 'reports', label: t.reports, icon: ChartNoAxesCombined }
    ]}
  ];

  const navClick = (key) => {
    setActive(key);
    setSidebarOpen(false);
  };

  return <div className={`app-shell ${dark ? 'dark' : ''}`}>
    {sidebarOpen && <button className="mobile-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close menu"/>}
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><LibraryBig size={23}/></div>
        <div className="brand-name">library<span>pro</span><small>MANAGEMENT SYSTEM</small></div>
        <button className="mobile-close icon-button" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"><X size={19}/></button>
      </div>
      <div className="library-switch">
        <div className="library-avatar"><LibraryBig size={18}/></div>
        <div className="library-info"><strong>Central Library</strong><span>Public Library</span></div>
        <ChevronDown size={16} className="muted-icon"/>
      </div>
      <nav className="side-nav">
        {navGroups.map(group => <div className="nav-group" key={group.title}>
          <div className="nav-heading">{group.title}</div>
          {group.items.map(item => {
            const Icon = item.icon;
            return <button key={item.key} className={`nav-item ${active === item.key ? 'active' : ''}`} onClick={() => navClick(item.key)}>
              <Icon size={18}/><span>{item.label}</span>{item.count && <small>{item.count}</small>}
            </button>;
          })}
        </div>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-promo">
          <div className="promo-icon"><BookMarked size={19}/></div>
          <strong>Knowledge grows here.</strong>
          <p>Manage your library with ease and confidence.</p>
          <button onClick={() => navClick('reports')}>Explore reports <ArrowUpRight size={14}/></button>
        </div>
        <button className={`nav-item ${active === 'settings' ? 'active' : ''}`} onClick={() => navClick('settings')}><Settings size={18}/><span>{t.settings}</span></button>
        <button className="nav-item" onClick={() => navClick('support')}><HelpCircle size={18}/><span>{t.support}</span></button>
        <div className="sidebar-footer">© 2026 Library Pro <span>v1.0.0</span></div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <div className="topbar-left">
          <button className="mobile-menu icon-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21}/></button>
          <div className="breadcrumb"><span>Pages</span><ChevronRight size={14}/><strong>{active === 'dashboard' ? t.dashboard : (navGroups.flatMap(g=>g.items).find(i=>i.key===active)?.label || active)}</strong></div>
        </div>
        <div className="topbar-actions">
          <label className="global-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/><kbd>⌘ K</kbd></label>
          <button className="top-icon language-button" onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')} title="Change language"><Languages size={18}/><span>{language === 'en' ? 'EN' : 'বাং'}</span></button>
          <button className="top-icon" onClick={() => setDark(!dark)} title="Toggle theme">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <button className="top-icon notification-button" aria-label="Notifications"><Bell size={18}/><i/></button>
          <div className="profile-menu"><div className="profile-avatar">AD</div><div className="profile-text"><strong>Admin User</strong><span>Super Admin</span></div><ChevronDown size={15}/></div>
        </div>
      </header>

      <div className="content">
        <div className="page-heading">
          <div><div className="eyebrow">{t.overview}</div><h1>{active === 'dashboard' ? t.welcome : (navGroups.flatMap(g=>g.items).find(i=>i.key===active)?.label || active)}</h1><p>{t.subtitle}</p></div>
          <div className="heading-actions"><div className="date-chip"><CalendarDays size={16}/>{t.today}</div><button className="primary-button" onClick={() => navClick('books')}><Plus size={17}/>{t.addBook}</button></div>
        </div>

        <section className="stats-grid">
          <StatCard icon={BookOpen} label={t.totalBooks} value="12,450" change="+12.8%" trend="up" tone="green" detail={t.fromLast}/>
          <StatCard icon={BookMarked} label={t.available} value="8,240" change="+8.2%" trend="up" tone="blue" detail={t.fromLast}/>
          <StatCard icon={ArrowLeftRight} label={t.borrowed} value="3,810" change="-2.4%" trend="down" tone="orange" detail={t.fromLast}/>
          <StatCard icon={Users} label={t.membersCount} value="2,180" change="+18.6%" trend="up" tone="purple" detail={t.fromLast}/>
        </section>

        <section className="analytics-grid">
          <div className="panel chart-panel">
            <div className="panel-heading"><div><h2>{t.borrowing}</h2><p>{t.borrowingSub}</p></div><button className="select-button">{t.thisYear}<ChevronDown size={15}/></button></div>
            <div className="chart-legend"><span><i className="legend-dot issued-dot"/>{t.issued}</span><span><i className="legend-dot returned-dot"/>{t.returned}</span></div>
            <div className="line-chart"><ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{top: 12, right: 8, left: -18, bottom: 0}}>
                <defs>
                  <linearGradient id="issuedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#176b45" stopOpacity={0.16}/><stop offset="100%" stopColor="#176b45" stopOpacity={0}/></linearGradient>
                  <linearGradient id="returnedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e5b86c" stopOpacity={0.12}/><stop offset="100%" stopColor="#e5b86c" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="var(--chart-grid)"/>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:'var(--muted)',fontSize:11}} dy={10}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:'var(--muted)',fontSize:11}}/>
                <Tooltip contentStyle={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,color:'var(--text)',fontSize:12}}/>
                <Area type="monotone" dataKey="issued" name={t.issued} stroke="#176b45" strokeWidth={2.5} fill="url(#issuedFill)" activeDot={{r:5}}/>
                <Area type="monotone" dataKey="returned" name={t.returned} stroke="#e0ad58" strokeWidth={2.5} fill="url(#returnedFill)" activeDot={{r:5}}/>
              </AreaChart>
            </ResponsiveContainer></div>
          </div>
          <div className="panel category-panel">
            <div className="panel-heading"><div><h2>{t.categoriesTitle}</h2><p>{t.categoriesSub}</p></div><button className="more-button"><MoreHorizontal size={20}/></button></div>
            <div className="donut-wrap"><ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={91} paddingAngle={3} stroke="none">{categoryData.map((entry,i)=><Cell key={i} fill={entry.color}/>)}</Pie><Tooltip formatter={(v)=>`${v}%`} contentStyle={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10}}/></PieChart>
            </ResponsiveContainer><div className="donut-center"><strong>12.4k</strong><span>Total Books</span></div></div>
            <div className="category-legend">{categoryData.map(c=><div key={c.name}><span><i style={{background:c.color}}/>{c.name}</span><strong>{c.value}%</strong></div>)}</div>
          </div>
        </section>

        <section className="lower-grid">
          <div className="panel transactions-panel">
            <div className="panel-heading"><div><h2>{t.recent}</h2><p>{t.recentSub}</p></div><button className="text-button" onClick={()=>navClick('issue')}>{t.viewAll}<ArrowUpRight size={15}/></button></div>
            <div className="table-wrap"><table><thead><tr><th>{t.member}</th><th>{t.book}</th><th>{t.issueDate}</th><th>{t.dueDate}</th><th>{t.status}</th><th></th></tr></thead><tbody>
              {transactions.map((tr,i)=><tr key={tr.id}><td><div className="member-cell"><div className={`member-avatar ${tr.color}`}>{tr.initials}</div><div><strong>{tr.name}</strong><small>{tr.id}</small></div></div></td><td className="book-cell">{tr.book}</td><td>{tr.date}</td><td>{tr.due}</td><td><span className={`status-badge ${tr.status.toLowerCase()}`}>{tr.status}</span></td><td><button className="icon-button subtle"><MoreHorizontal size={17}/></button></td></tr>)}
            </tbody></table></div>
          </div>
          <div className="panel activity-panel">
            <div className="panel-heading"><div><h2>{t.activities}</h2><p>Latest updates</p></div><button className="more-button"><MoreHorizontal size={20}/></button></div>
            <div className="activity-list">
              <div className="activity-item"><div className="activity-icon green"><UserRound size={16}/></div><div><strong>New member registered</strong><p>Rafiul Islam joined the library</p><small>10 minutes ago</small></div></div>
              <div className="activity-item"><div className="activity-icon blue"><BookOpen size={16}/></div><div><strong>Book added to catalog</strong><p>“Deep Work” added by Admin</p><small>35 minutes ago</small></div></div>
              <div className="activity-item"><div className="activity-icon orange"><RotateCcw size={16}/></div><div><strong>Book returned</strong><p>Atomic Habits returned successfully</p><small>1 hour ago</small></div></div>
              <div className="activity-item"><div className="activity-icon purple"><Wallet size={16}/></div><div><strong>Fine payment received</strong><p>৳ 50 received from member</p><small>2 hours ago</small></div></div>
            </div>
          </div>
        </section>

        <section className="panel popular-panel">
          <div className="panel-heading"><div><h2>{t.popular}</h2><p>Most borrowed books in your library</p></div><button className="text-button" onClick={()=>navClick('books')}>{t.viewAll}<ArrowUpRight size={15}/></button></div>
          <div className="book-grid">{filteredBooks.map((book,i)=><div className="book-card" key={book.id}>
            <div className={`book-cover ${book.color}`}><span>{book.cover}</span><small>{book.category}</small></div>
            <div className="book-info"><strong>{book.title}</strong><span>{book.author}</span><div className="book-meta"><small>{book.id}</small><span className={`status-badge ${book.status.toLowerCase().replace(' ','-')}`}>{book.status}</span></div><div className="copy-progress"><div><span>Available copies</span><strong>{book.copies}</strong></div><div className="progress-track"><i style={{width: `${parseInt(book.copies)/parseInt(book.copies.split('/')[1])*100}%`}}/></div></div></div>
          </div>)}</div>
          {filteredBooks.length === 0 && <div className="empty-state">No matching books found.</div>}
        </section>

        <footer className="page-footer"><span>© 2026 Library Pro. All rights reserved.</span><span>Made with care for readers <span className="footer-heart">♥</span></span></footer>
      </div>
    </main>
  </div>;
}

export default App;