---
layout: post
title: " \"cannot find -lz\" on gem install"
description: ""
category:
tags: [ruby, gem, kyotocabinet, zlib]
---

kyotocabinet-ruby のようなgemファイルインストール時に

    checking for kccommon.h... *** extconf.rb failed ***

みたいに出る。

mkmf.logを見ると、

    /usr/bin/ld: cannot find -lz

とのこと。
zilbのライブラリがないようなので

fedora等では

    sudo yum install zlib-devel

ubuntu等では

    sudo aptitude install zlib1g-dev
