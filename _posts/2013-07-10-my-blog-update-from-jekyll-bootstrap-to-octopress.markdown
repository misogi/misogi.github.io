---
layout: post
title: "My blog migrate from jekyll-bootstrap to octopress"
date: 2013-07-10 16:12
comments: false
categories: ruby
---

久しぶりにブログを更新しようと思ったら Jekyll-bootstrap が更新されていなかった。

ので、octopress に切り替えようと思ってやってみた。

- octopressインストール

http://octopress.org/docs/setup/

```
% git clone git://github.com/imathis/octopress.git octopress
% cd octopress
```

```
% rake install
## Copying classic theme into ./source and ./sass
mkdir -p source
cp -r .themes/classic/source/. source
mkdir -p sass
cp -r .themes/classic/sass/. sass
mkdir -p source/_posts
mkdir -p public
```

rake install で何か初期設定をやってくれているのでしょう。ディレクトリ作成してくれています。

cd octopress した時点で、rvm ちゃんに怒られる。
きっと octopress のせいではなくて、ruby 使わなくなって久しい私に rvm が怒っている。
この件は別エントリ。

ともあれ、 rvm でも rbenv でもバージョン指定がすでに済んでいるようである。

- デプロイ設定

```
% rake setup_github_pages
```

すると、github のリポジトリを問われる。

私のリポジトリを答える。  

```
Repository url: git@github.com:misogi/misogi.github.io.git
```

するとデプロイ設定までやってくれる。
この時点で、リモートの設定とブランチの設定が書き換わります。

リモートは2つになり、

```
% git remote -v
octopress git://github.com/imathis/octopress.git (fetch)
octopress git://github.com/imathis/octopress.git (push)
origin git@github.com:misogi/misogi.github.com.git (fetch)
origin git@github.com:misogi/misogi.github.com.git (push)
```

ブランチも2つになります。

が、ルートディレクトリが source ブランチ、\_deploy ディレクトリが master となります。

不思議な運用に見えますが、よくあるのでしょうか。

- ブログを書いてデプロイ

```
% rake new_post
```

で、 source/\_posts 以下に新しいポストができる。

jekyll-bootstrap だと、 \_posts 以下だったので、なんとか移植せねばならない。

jekyll-bootstrapを元にした今までのバージョンがあるため、どうしたものか。

octopress にまつわるファイルを今までのリポジトリに突っ込んだが、単純に github pages のリポジトリを消してやり直した。

```
% rake generate
% rake deploy
```

generate で public ディレクトリ以下のHTMLファイルを再構築し、
deploy で master ブランチをpushする。
それらをいっぺんにやる gen_deploy というrakeタスクもある。

で、最後に source ブランチを忘れずに push しましょう。
今後忘れそう・・ 

```
% git push origin source
```