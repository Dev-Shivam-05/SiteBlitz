/** Loads everything the Today page and the daily brief show. Callers must have checked
 *  dbConfigured() and called dbConnect() first. Bucketing itself is the pure lib/today.ts. */

import { AdSpend, Lead } from "./models";
import { notificationCounts } from "./notify";
import { bucketLeads, countYesterdayBySource, istDayStart, istWeekRange } from "./today";
import { AD_MEDIA_CAP_INR, CLOSED_STATUSES, CONCEPT_WEEKLY_CAP, withGst } from "./leadops";

const OPEN_LIMIT = 500;
const DAY_MS = 24 * 60 * 60 * 1000;

export async function loadTodayData(now: Date = new Date()) {
  const week = istWeekRange(now);
  const todayStart = istDayStart(now);
  const yesterdayStart = new Date(todayStart.getTime() - DAY_MS);

  const [open, concepts, yesterday, spendAgg, recentSpend, alerts] = await Promise.all([
    Lead.find({ status: { $nin: [...CLOSED_STATUSES] } })
      .sort({ nextActionAt: 1, createdAt: -1 })
      .limit(OPEN_LIMIT)
      .select("name phone ref owner status nextAction nextActionAt businessType source createdAt lastContactAt")
      .lean(),
    Lead.countDocuments({ conceptAt: { $gte: week.start, $lt: week.end } }),
    Lead.find({ createdAt: { $gte: yesterdayStart, $lt: todayStart } }).select("createdAt source").lean(),
    AdSpend.aggregate<{ total: number }>([{ $group: { _id: null, total: { $sum: "$amountInr" } } }]),
    AdSpend.find().sort({ day: -1, createdAt: -1 }).limit(7).lean(),
    notificationCounts(),
  ]);

  const mediaTotal = spendAgg[0]?.total ?? 0;
  return {
    now: now.toISOString(),
    buckets: bucketLeads(open, now),
    openTruncated: open.length >= OPEN_LIMIT,
    concepts: { thisWeek: concepts, cap: CONCEPT_WEEKLY_CAP, weekStart: week.start.toISOString() },
    newYesterday: countYesterdayBySource(yesterday, now),
    adSpend: {
      mediaTotal,
      cap: AD_MEDIA_CAP_INR,
      estimatedWithGst: withGst(mediaTotal),
      recent: recentSpend,
    },
    alerts,
  };
}

export type TodayData = Awaited<ReturnType<typeof loadTodayData>>;
