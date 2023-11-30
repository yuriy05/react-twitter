// Підключаємо технологію express для back-end сервера
const express = require('express')
// Створюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { Post } = require("../class/post")

// ========================================================

router.post("/post-create", function(req, res) {
    try {
        const { username, text, postId } = req.body

        if (!username || !text) {
            return res.status(400).json({
                message: "Потрібно передати всі дані для створення поста",
            })
        }

        let post = null

        console.log(postId, "postId")

        if (postId) {
            post = Post.getById(Number(postId))
            console.log("post", post)

            if (!post) {
                return res.status(400).json({
                    message: "Пост з таким ID не існє",
                })
            }
        }

        const newPost = Post.create(username, text, post)

        return res.status(200).json({
            post: {
                id: newPost.id,
                text: newPost.text,
                username: newPost.username,
                date: newPost.date,
            },
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message,
        })
    }
})