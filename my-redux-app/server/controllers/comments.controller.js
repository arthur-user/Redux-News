// server/controllers/comments.controller.js
import supabase from '../config/db.js';

export const getByArticleId = async (req, res) => {
  const { articleId } = req.params;
  console.log('🔍 Fetching comments for article:', articleId);

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('article_id', articleId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Supabase error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }

  console.log('✅ Comments fetched:', data);
  res.json({ success: true, comments: data });
};

export const create = async (req, res) => {  // ✅ Added export
  console.log('📥 Received POST request');
  console.log('📥 Request body:', req.body);
  
  const { articleId, author, content } = req.body;

  if (!articleId || !author || !content) {
    console.log('❌ Missing fields:', { articleId, author, content });
    return res.status(400).json({
      success: false,
      error: 'articleId, author, and content are all required',
    });
  }

  if (content.trim().length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Comment must be at least 3 characters',
    });
  }

  if (content.length > 500) {
    return res.status(400).json({
      success: false,
      error: 'Comment cannot exceed 500 characters',
    });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([{
      article_id: articleId,
      author: author.trim(),
      content: content.trim(),
    }])
    .select()
    .single();

  if (error) {
    console.error('❌ Supabase insert error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }

  console.log('✅ Comment created:', data);
  res.status(201).json({ success: true, comment: data });
};

export const remove = async (req, res) => {  // ✅ Added export
  const { commentId } = req.params;

  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .select()
    .single();

  if (error) {
    return res.status(404).json({ success: false, error: 'Comment not found' });
  }

  res.json({ success: true, comment: data });
};

// ✅ REMOVED the export default at the bottom