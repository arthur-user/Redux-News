import React from 'react';
import Comments from "../features/comments/Comments";

export default function NewsCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.image_url && (
        <img 
          src={article.image_url} 
          alt={article.title}
          className="w-full h-48 object-cover"
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {article.category && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {article.category[0]}
            </span>
          )}
          <span className="text-xs text-gray-500">
            {new Date(article.pubDate).toLocaleDateString()}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.description}</p>
        {article.link && (
          <a 
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read more →
          </a>
        )}
        
        <Comments article={{ id: article.article_id }} />
      </div>
    </div>
  );
}