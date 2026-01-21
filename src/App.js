// ============= التعديل الأول: استيراد المكتبات =============
import React, { useState, useEffect } from 'react';
// هذا هو السطر الجديد الذي يستدعي مكتبة فاركاستر
import FarcasterSDK from '@farcaster/miniapp-sdk';
// =========================================================

// ============= التعديل الثاني: تهيئة الـ SDK ==============
// نقوم بإنشاء كائن الـ SDK هنا، مرة واحدة فقط
const sdk = new FarcasterSDK();
// =========================================================


export default function ThePhilosophers() {
  const [appState, setAppState] = useState('dashboard');
  const [currentToken, setCurrentToken] = useState('ETH');
  const [activeView, setActiveView] = useState('question');
  const [showAbout, setShowAbout] = useState(false);
  const [showTokenSelector, setShowTokenSelector] = useState(false);

  // ============= التعديل الثالث: إخبار Warpcast بأن التطبيق جاهز ==============
  // هذا الكود يتم تشغيله مرة واحدة عند تحميل التطبيق ليخبر Warpcast
  // بإخفاء شاشة التحميل وعرض تطبيقك.
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  // =========================================================================


  const TOKENS = {
    ETH: 'ETH',
    USDC: 'USDC',
    DAI: 'DAI'
  };

  const currentQuestion = {
    text: 'Do you believe consciousness is fundamentally non-physical?',
    pool: 45.7,
    participants: 234
  };

  const historyData = [
    {
      id: 12,
      text: 'Does free will exist in a deterministic universe?',
      date: '2026-01-17',
      result: 'Yes',
      yesPercentage: 62,
      noPercentage: 38,
      pool: 38.2
    },
    {
      id: 11,
      text: 'Is the universe infinite?',
      date: '2026-01-16',
      result: 'Yes',
      yesPercentage: 55,
      noPercentage: 45,
      pool: 42.1
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'alex.eth', wagers: 47, rewards: 3.2 },
    { rank: 2, name: 'sophia_mind', wagers: 43, rewards: 2.8 },
    { rank: 3, name: 'trivialJake', wagers: 39, rewards: 2.4 },
    { rank: 4, name: 'quantum_soul', wagers: 35, rewards: 1.9 },
    { rank: 5, name: 'you.eth', wagers: 28, rewards: 1.5 }
  ];

    // باقي الكود الخاص بك لم يتم تغييره على الإطلاق
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-light text-slate-100">About The Philosophers</h2>
              <button
                onClick={() => setShowAbout(false)}
                className="text-slate-400 hover:text-slate-200 text-2xl"
              >
                X
              </button>
            </div>
            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-lg font-light text-slate-100 mb-3">How It Works</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every day at 12:00 UTC, The Philosophers publishes a binary philosophical question. Users place wagers and all funds pool together. When results are revealed, winners receive their stake back plus a proportional share of losers' funds.
                </p>
              </section>
              <section>
                <h3 className="text-lg font-light text-slate-100 mb-3">Key Features</h3>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li>Multi-token support ETH, USDC, DAI</li>
                  <li>3% protocol fees on winnings</li>
                  <li>On-chain verification required</li>
                  <li>Transparent pool distribution</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}

      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-lg font-light text-slate-100">The Philosophers</div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowTokenSelector(!showTokenSelector)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-2 rounded-lg text-sm font-light flex items-center gap-2"
              >
                <span>{currentToken === 'ETH' ? 'E' : currentToken === 'USDC' ? 'U' : 'D'}</span>
                <span>{currentToken}</span>
              </button>

              {showTokenSelector && (
                <div className="absolute right-0 mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50 min-w-40">
                  {Object.keys(TOKENS).map(token => (
                    <button
                      key={token}
                      onClick={() => {
                        setCurrentToken(token);
                        setShowTokenSelector(false);
                      }}
                      className={`w-full text-left px-4 py-3 border-b border-slate-700 last:border-0 flex items-center gap-3 transition-colors ${
                        currentToken === token
                          ? 'bg-slate-800 text-slate-100'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{token === 'ETH' ? 'E' : token === 'USDC' ? 'U' : 'D'}</span>
                      <div>
                        <div className="font-light text-sm">{token}</div>
                        {currentToken === token && <div className="text-xs text-slate-500">Active</div>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowAbout(true)}
              className="text-slate-400 hover:text-slate-200 text-xl"
            >
              i
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
        {activeView === 'question' && (
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-center min-h-80">
              <div className="max-w-2xl w-full text-center space-y-8">
                <div className="text-xs text-slate-500">Todays Question</div>
                <h2 className="text-2xl md:text-3xl font-light text-slate-100 leading-relaxed">
                  {currentQuestion.text}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-xs text-slate-500 mb-2">Total Pool</div>
                    <div className="text-2xl font-light text-slate-100">
                      {currentQuestion.pool} {currentToken}
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-xs text-slate-500 mb-2">Participants</div>
                    <div className="text-2xl font-light text-slate-100">
                      {currentQuestion.participants}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 space-y-6">
              <div className="space-y-4">
                <div className="text-sm text-slate-400">Your Wager</div>

                <div className="flex gap-3">
                  <button className="flex-1 py-4 rounded-lg font-light bg-slate-800 text-slate-300 hover:bg-slate-700">
                    Yes
                  </button>
                  <button className="flex-1 py-4 rounded-lg font-light bg-slate-800 text-slate-300 hover:bg-slate-700">
                    No
                  </button>
                </div>

                <input
                  type="number"
                  placeholder={`Amount ${currentToken}`}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600"
                />

                <button className="w-full bg-slate-100 text-slate-900 py-3 rounded-lg font-light hover:bg-slate-200">
                  Place Wager
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'history' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-slate-100">The Philosophical Ledger</h2>
            <div className="space-y-4">
              {historyData.map(q => (
                <div key={q.id} className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                  <h3 className="text-slate-100 font-light text-lg mb-2">{q.text}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="text-xs text-slate-500">Pool</div>
                      <div className="text-lg font-light text-slate-100">{q.pool} {currentToken}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="text-xs text-slate-500">Yes</div>
                      <div className="text-lg font-light text-slate-100">{q.yesPercentage}%</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="text-xs text-slate-500">No</div>
                      <div className="text-lg font-light text-slate-100">{q.noPercentage}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'leaderboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-slate-100">Weekly Leaderboard</h2>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden">
              {leaderboard.map(user => (
                <div
                  key={user.rank}
                  className="border-b border-slate-700 last:border-0 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-light text-slate-400">{user.rank}</div>
                    <div>
                      <div className="text-slate-100 font-light">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.wagers} wagers</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-100">{user.rewards} {currentToken}</div>
                    <div className="text-xs text-slate-500">earned</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-slate-100">Your Profile</h2>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-xs mb-1">Farcaster</p>
                  <p className="text-slate-100 font-light">you.eth</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Wallet</p>
                  <p className="text-slate-100 font-light text-sm">0x742d...6bE8</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-xs text-slate-500">Total Wagers</div>
                  <div className="text-2xl font-light text-slate-100">28</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-xs text-slate-500">Wins</div>
                  <div className="text-2xl font-light text-green-400">15</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-xs text-slate-500">Rewards</div>
                  <div className="text-2xl font-light text-slate-100">1.5</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-around">
          {[
            { id: 'question', label: 'Today', icon: 'book' },
            { id: 'history', label: 'Archive', icon: 'library' },
            { id: 'leaderboard', label: 'Leaderboard', icon: 'trophy' },
            { id: 'profile', label: 'Profile', icon: 'user' }
          ].map(nav => (
            <button
              key={nav.id}
              onClick={() => setActiveView(nav.id)}
              className={`flex-1 py-4 text-center border-t-2 transition-colors ${
                activeView === nav.id
                  ? 'border-slate-100 text-slate-100'
                  : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              <div className="text-xl">{nav.icon === 'book' ? '📖' : nav.icon === 'library' ? '📚' : nav.icon === 'trophy' ? '🏆' : '👤'}</div>
              <div className="text-xs font-light mt-1">{nav.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
