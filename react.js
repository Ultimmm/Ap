import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Heart, Award, Sparkles, Brain, Calendar, Music, 
  UserCircle, LogOut, Settings, Bell, Smile, Sun, 
  Moon, Cloud, CloudRain, Zap, Trophy, ChevronRight,
  MessageSquare
} from 'lucide-react';

// Custom hook for authentication
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    setUser({
      id: 1,
      name: "Alex Turner",
      email,
      streak: 15,
      level: 8,
      moodPoints: 2450
    });
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return { user, loading, login, logout };
};

// Utility Components
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const StatCard = ({ icon, title, value }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Feature Components
const AuthScreen = ({ onLogin, showLoginForm, setShowLoginForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-purple-600" />
          </div>
          <CardTitle className="text-3xl font-bold">MoodSync</CardTitle>
          <p className="text-gray-600 mt-2">Connect. Grow. Thrive Together.</p>
        </CardHeader>
        <CardContent>
          {showLoginForm ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              onLogin(email, password);
            }} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Login
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Button 
                onClick={() => setShowLoginForm(true)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Login with Email
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Continue with Google
              </Button>
              <Button className="w-full bg-black hover:bg-gray-800">
                Continue with Apple
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Navbar = ({ user, onLogout }) => (
  <div className="bg-white shadow-sm">
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            MoodSync
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-purple-600" />
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2"
            onClick={onLogout}
          >
            <UserCircle className="h-6 w-6" />
            <span>{user.name}</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = ({ currentView, setCurrentView, user }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Sparkles />, label: 'Dashboard' },
    { id: 'mood', icon: <Smile />, label: 'Mood Tracker' },
    { id: 'social', icon: <Heart />, label: 'Social Feed' },
    { id: 'insights', icon: <Brain />, label: 'AI Insights' },
    { id: 'challenges', icon: <Trophy />, label: 'Challenges' },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-6">
          <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
            <h3 className="font-semibold">Level {user.level}</h3>
            <p className="text-sm text-gray-600">{user.moodPoints} Mood Points</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ width: '70%' }}
              ></div>
            </div>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  currentView === item.id ? 'bg-purple-100 text-purple-800' : ''
                }`}
                onClick={() => setCurrentView(item.id)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = ({ user }) => {
  const [moodData] = useState([
    { day: 'Mon', mood: 8 },
    { day: 'Tue', mood: 7 },
    { day: 'Wed', mood: 9 },
    { day: 'Thu', mood: 6 },
    { day: 'Fri', mood: 8 }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard 
          icon={<Zap className="text-yellow-500" />}
          title="Current Streak"
          value={`${user.streak} days`}
        />
        <StatCard 
          icon={<Trophy className="text-purple-500" />}
          title="Level"
          value={user.level}
        />
        <StatCard 
          icon={<Heart className="text-red-500" />}
          title="Mood Points"
          value={user.moodPoints}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Mood Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-between">
            {moodData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className="w-8 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                  style={{ height: `${data.mood * 10}%` }}
                ></div>
                <span className="text-sm text-gray-600">{data.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
const App = () => {
  const { user, loading, login, logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [showLoginForm, setShowLoginForm] = useState(false);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthScreen 
      onLogin={login} 
      showLoginForm={showLoginForm} 
      setShowLoginForm={setShowLoginForm} 
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar user={user} onLogout={logout} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Sidebar 
              currentView={currentView} 
              setCurrentView={setCurrentView} 
              user={user} 
            />
          </div>
          <div className="col-span-9">
            <Dashboard user={user} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
