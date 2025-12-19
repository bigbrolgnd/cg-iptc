import { SubstackItem } from "@/types/substack";
import Link from "next/link";

interface RecentUpdatesListProps {
    articles: SubstackItem[];
}

export function RecentUpdatesList({ articles }: RecentUpdatesListProps) {
    if (!articles || articles.length === 0) {
        return <div className="text-zinc-400 italic text-sm">No recent updates.</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-500 border-b border-zinc-200 pb-2 mb-2">
                Recent Updates
            </h3>
            {articles.map((article) => {
                let formattedDate = 'Recent';
                try {
                    const date = new Date(article.pubDate);
                    if (!isNaN(date.getTime())) {
                        formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }
                } catch (e) {
                    console.error('Invalid date for article:', article.title, article.pubDate);
                }

                return (
                    <article key={article.guid} className="flex flex-col gap-1 group">
                        <Link href={article.link} target="_blank" className="font-serif font-bold text-lg leading-tight group-hover:text-red-700 transition-colors cursor-pointer">
                            {article.title}
                        </Link>
                        <time className="text-xs text-zinc-400 font-mono">
                            {formattedDate}
                        </time>
                    </article>
                );
            })}
        </div>
    );
}
