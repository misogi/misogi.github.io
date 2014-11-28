---
layout: post
title: "convert to git from hg"
date: 2013-07-12 10:52
comments: true
categories:
---

Mercurial + bitbucket でホストしている趣味のプロジェクトがいくつかあるのですが、全部 github でやれば良いよねってことで、コンバートできるかぐぐってみました。

Convert Mercurial project to Git - Stack Overflow http://stackoverflow.com/questions/16037787/convert-mercurial-project-to-git

> Q. mercurial のプロジェクトを git に移行したい。コミット履歴もそっくりそのまま移行したい。
> hg 関連のファイルを消して、 git init して、git add したけどコレじゃ履歴が引き継がれない。
> 解決策ない？
>
> A. fast-export 使え

# hg インストール

作業は、hgの入っていないLinuxマシンにて行う。(fedora-19)

python がなければ必要かも。

```
sudo yum install hg
```

# リポジトリをとってくる


```
hg clone ssh@hg@bitbucket.org/USERNAME/PROJECT hg_repo
```

# fast-export をとってくる

```
git clone git://repo.or.cz/fast-export.git
```

# 新しいリポジトリを作り、hg からインポート

ローカルは

```
git init git_repo
cd git_repo
/path/to/fast-export/hg-fast-export.sh -r /path/to/hg_repo
git checkout HEAD
```

# リモートにリポジトリを作り、マージして push

リモートは github から create repository して

```
git remote add origin git@github.com:USERNAME/git_repo.git
git fetch
git merge origin/master
git status # if you feel uneasy
git push origin master
```
