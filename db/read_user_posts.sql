SELECT sp_posts.* FROM sp_posts WHERE user_id = (SELECT id FROM spchat_users WHERE username = $1);
