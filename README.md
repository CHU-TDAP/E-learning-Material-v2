國立自然科學博物館 教材
===
適用於"無所不在學習導引系統之研製"系統使用。

## 檔案規劃
    
```text
root ─┬─ assets (外部函式庫資源)
      ├─ css (網頁外觀)
      ├─ js (互動控制)
      ├─ images (頁面圖片，像是背景之類的)
      │  
      ├─ 1 (標的內部編號)
      │  ├─ images (教材內容圖片)
      │  │  └─ ...... 
      │  ├─ index.html (主要教材)
      │  ├─ what.html (其中一組教材)
      │  └─ question.html (小測驗)
      ├─ ...... 
      │  
      └─ index.html (首頁，作為目錄用)
```

## 用途
如開頭所寫的，就是使用在博物館導覽系統內所用的教材，整體規劃完全就是要來配合導覽系統的需求。

但也保留可獨立使用的彈性。如不作為導覽系統使用，可把整個站當成一般的教學教材網站使用。

## 功能
* 一個標的內有多組教材
* 在這個標的導覽完以前，會出個小問題考考。
* 配合導覽系統使用: 會通知App相關訊息（作答內容、回答完成...）

## 使用此教材
請直接從[Release]下載整份壓縮檔後即可

## 開發/維護此教材
### 1. 安裝Node.JS
#### Mac OSX
    brew install node

### 2. 安裝相關套件

    [sudo] npm install -g grunt-cli
    [sudo] npm install -g bower
    npm install && bower install

### 3. 啟動自動化工具

    grunt

啟動後會監視專案內的`.html`,`.css`檔案，一有任何變動將會

* livereload: 呼叫瀏覽器自動重新整理

#### 瀏覽器plugin安裝
[LiveReload - browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)

支援主流瀏覽器: Firefox, Chrome, Safari

## 規格
### 一個標的為一個資料夾

* 一個網頁為一組教材，如果有四組教材，就是四個網頁。
* 多組教材網頁要設連結到`question.html`來作隨堂測驗小考。

### 配合導覽系統使用
* 為了做到獨立運作，不內建紀錄回答狀況功能，將改由App應用程式來實現
    * 僅提供與App溝通用的API（用JavaScript呼叫）
