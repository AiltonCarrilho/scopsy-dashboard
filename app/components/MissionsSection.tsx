'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Check } from 'lucide-react';
import Image from 'next/image';

interface Mission {
    id: string;
    description: string;
    progress: number;
    target: number;
    is_completed: boolean;
    reward_cognits: number;
}

export default function MissionsSection() {
    const [timeLeft, setTimeLeft] = useState('--:--');
    // Mock missions for now
    const missions: Mission[] = [
        { id: '1', description: 'Complete 3 diagnósticos no Radar', progress: 1, target: 3, is_completed: false, reward_cognits: 50 },
        { id: '2', description: 'Acesse a plataforma por 3 dias seguidos', progress: 3, target: 3, is_completed: true, reward_cognits: 100 },
    ];

    useEffect(() => {
        function updateTimer() {
            const now = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const diff = tomorrow.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${hours}h ${minutes}m`);
        }

        updateTimer();
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
    }, []);

    if (missions.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold text-[#1A2B48]">
                    <span className="text-2xl">📜</span> Missões Diárias
                </h2>
                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-[#64748B]">
                    <Clock size={14} /> Reseta em <span>{timeLeft}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {missions.map((mission) => (
                    <MissionCard key={mission.id} mission={mission} />
                ))}
            </div>
        </section>
    );
}

function MissionCard({ mission }: { mission: Mission }) {
    const percent = Math.min((mission.progress / mission.target) * 100, 100);

    return (
        <div className={`relative overflow-hidden rounded-xl border p-4 transition-all ${mission.is_completed ? 'bg-[#2DD4BF]/10 border-[#2DD4BF]/20' : 'bg-white border-gray-100'}`}>
            <div className="mb-3 flex justify-between">
                <span className="text-sm font-medium text-[#1A2B48]">{mission.description}</span>
                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-bold text-yellow-700">
                    <Image src="/assets/icons/cognit-24.svg" alt="XP" width={12} height={12} />
                    +{mission.reward_cognits}
                </div>
            </div>

            {mission.is_completed && (
                <div className="absolute right-2 top-2 text-[#2DD4BF] opacity-20">
                    <Check size={48} />
                </div>
            )}

            <div className="mt-2">
                <div className="mb-1 flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                        className={`h-full transition-all duration-1000 ${mission.is_completed ? 'bg-[#2DD4BF]' : 'bg-[#008CE2]'}`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs font-medium text-[#64748B]">
                    <span>{mission.is_completed ? 'Completado!' : `${mission.progress} / ${mission.target}`}</span>
                    {!mission.is_completed && <span>{Math.round(percent)}%</span>}
                </div>
            </div>
        </div>
    );
}
