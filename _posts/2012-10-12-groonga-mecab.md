---
layout: post
title: Groonga、Mecabインストール
description:
category:
tags: [Linux, Groonga, Mecab, search_engine]
---

- インストール

ubuntu 12.04

[2.4. Ubuntu — groonga v2.0.7ドキュメント](http://groonga.org/ja/docs/install/ubuntu.html#lts-precise-pangolin)

- mecab インストール

[Mecabのインストールと辞書のUTF-8化 - 森薫の日記](http://d.hatena.ne.jp/kaorumori/20071227/1198764638)

- テーブル作成

チュートリアルを参考に。

[4.1. 基本的な操作 — groonga v2.0.7ドキュメント](http://groonga.org/ja/docs/tutorial/introduction.html)

テーブル・カラム作成

    table_create --name Site --flags TABLE_HASH_KEY --key_type ShortText
    column_create --table Site --name title --type ShortText

load.txtを用意

```json
load --table Post
[
{"_id":1,"body":"バージョン管理"},
{"_id":2,"body":"常にそれを使い続けることでしょう"},
{"_id":3,"body":"それぞれ特徴があり"},
{"_id":4,"body":"現状の開発スタイル"}
]
```

load.txtを使ってデータ投入

    $ groonga data.db < load.txt


辞書テーブル作成

    辞書テーブル作成
    table_create --name Terms --flags TABLE_PAT_KEY|KEY_NORMALIZE --key_type ShortText --default_tokenizer TokenMecab
    辞書テーブルにカラム作成
    column_create --table Terms --name blog_title --flags COLUMN_INDEX|WITH_POSITION --type Site --source title
    辞書テーブルを確認
    select --table Terms
    テーブルを検索
    select --table Site --query title:@特徴
