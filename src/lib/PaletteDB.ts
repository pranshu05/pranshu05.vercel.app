import { db } from '@/firebase/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp, QueryConstraint, } from 'firebase/firestore';

export interface WeeklyPalette {
    id?: string;
    week: number;
    year: number;
    colors: string[];
    startDate: Date;
    endDate: Date;
    createdAt: Date;
}

const COLLECTION_NAME = 'weekly_palettes';

export const paletteDB = {
    async saveWeeklyPalette(colors: string[], targetWeek?: number, targetYear?: number): Promise<string> {
        const now = new Date();
        
        const week = targetWeek ?? getWeekNumber(now);
        const year = targetYear ?? now.getFullYear();
        
        const weekStart = targetWeek && targetYear 
            ? getWeekStartByWeekNumber(targetWeek, targetYear)
            : getWeekStart(now);
        const weekEnd = targetWeek && targetYear
            ? getWeekEndByWeekNumber(targetWeek, targetYear)
            : getWeekEnd(now);

        const palette: Omit<WeeklyPalette, 'id'> = {
            week,
            year,
            colors,
            startDate: weekStart,
            endDate: weekEnd,
            createdAt: now,
        };

        try {
            const existing = await this.getPaletteByWeek(week, year);
            if (existing) {
                throw new Error(`Palette already exists for week ${week} of ${year}`);
            }

            const docRef = await addDoc(
                collection(db, COLLECTION_NAME),
                {
                    ...palette,
                    startDate: Timestamp.fromDate(weekStart),
                    endDate: Timestamp.fromDate(weekEnd),
                    createdAt: Timestamp.fromDate(now),
                }
            );

            return docRef.id;
        } catch (error) {
            console.error('Error saving weekly palette:', error);
            throw error;
        }
    },

    async getPaletteByWeek(week: number, year: number): Promise<WeeklyPalette | null> {
        try {
            const constraints: QueryConstraint[] = [
                where('week', '==', week),
                where('year', '==', year),
            ];

            const q = query(collection(db, COLLECTION_NAME), ...constraints);
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                return null;
            }

            const doc = snapshot.docs[0];
            return {
                id: doc.id,
                ...doc.data(),
                startDate: doc.data().startDate?.toDate() || new Date(),
                endDate: doc.data().endDate?.toDate() || new Date(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
            } as WeeklyPalette;
        } catch (error) {
            console.error('Error getting palette by week:', error);
            throw error;
        }
    },

    async getPalettesByYear(year: number): Promise<WeeklyPalette[]> {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where('year', '==', year),
                orderBy('week', 'asc')
            );

            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                startDate: doc.data().startDate?.toDate() || new Date(),
                endDate: doc.data().endDate?.toDate() || new Date(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
            })) as WeeklyPalette[];
        } catch (error) {
            console.error('Error getting palettes by year:', error);
            throw error;
        }
    },

    async getAllPalettes(): Promise<WeeklyPalette[]> {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                orderBy('year', 'desc'),
                orderBy('week', 'desc')
            );

            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                startDate: doc.data().startDate?.toDate() || new Date(),
                endDate: doc.data().endDate?.toDate() || new Date(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
            })) as WeeklyPalette[];
        } catch (error) {
            console.error('Error getting all palettes:', error);
            throw error;
        }
    },
};

export function getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

export function getWeekEnd(date: Date): Date {
    const start = getWeekStart(date);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return end;
}

export function getWeekStartByWeekNumber(weekNumber: number, year: number): Date {
    const jan4 = new Date(Date.UTC(year, 0, 4));
    
    const jan4DayOfWeek = jan4.getUTCDay() || 7;
    
    const week1Monday = new Date(jan4);
    week1Monday.setUTCDate(jan4.getUTCDate() - jan4DayOfWeek + 1);
    
    const targetWeekMonday = new Date(week1Monday);
    targetWeekMonday.setUTCDate(week1Monday.getUTCDate() + (weekNumber - 1) * 7);
    
    return targetWeekMonday;
}

export function getWeekEndByWeekNumber(weekNumber: number, year: number): Date {
    const start = getWeekStartByWeekNumber(weekNumber, year);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 6);
    return end;
}