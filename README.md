# 來用 Node.js 搭配 Express 框架時做一個部落格吧! 

## 概覽
在這一個小節，會大概介紹製作這個 Blog 用的一些技術以及工具。
### 採用 Node.js 的環境搭配 Express 
Node.js 的出現讓 JS 的發展出現了更多可能性，後端跟前端可以用同一種語言撰寫，不用再切換來切換去，使用像 Express 這樣的框架還可以快速的建立一個伺服器，使用起來其實方便的不可思議，未來或許有更多的可能性。所以想要秤這個專案試看看使用這個組合， 
### 採用 MVC 架構
在這個專案中，我使用了 MVC 的設計思維，將整個專案劃分為三個部分:

1. 專門跟資料庫互動的的 Model。
2. 呈現畫面的 View。
3. 將資料處理好分配給 view 的 Controller。

之所以採用 mvc，有幾個主要的原因:

1. 在 MVC 架構之下，檔案結構明確、目標明確，有益於之後的維護。
2. 在開發的過程中，MVC 不單整理了檔案結構，也整理了腦中的思緒，每個檔案要寫甚麼功能都清楚許多，效率增加許多。
3. 讓 code 保持乾淨，重複使用。
4. 因為邏輯明確，有益於團隊協作。

所以在這個專案裡嘗試使用了 MVC 的架構，所以可以看到在這個專案底下有 view、model、control 三個資料夾，裡面放的資料負責各自的工作。

### 使用 Sequelize 與資料庫互動
使用 [Sequelize](https://sequelize.org/)之後，就不需要使用 SQL 與資料庫互動了，可以使用 JavaScript 常見的資料型態 Object 來操縱資料庫，簡化了開發的複雜度，有降低了 bug 發生的可能性(不會某個 query string 寫錯整個掛掉)，是個很方便的工具。

### 使用 showdown 實作 markdown editor
markdown editor 雖然不是必需品，但是對於用習慣的我(應該還有很多人同樣身陷在 markdown 的便利性中)，最後決定實作一個 markdown editor。

[showdown](https://github.com/showdownjs/showdown) 這個 libary 可以快速寫出一個極簡的 markdown editor。但是在使用上，他有一些比較麻煩的設定規則需要注意，在最後呈現到畫面上的時候也需要做一些資料的轉換，但是仍舊算是個使用起來不差的工具，之後會再寫一篇文章紀錄 showdown 一些比較複雜的設定何時做細節放在這裡。













