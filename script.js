// URLからチーム名を取得
const urlParams = new URLSearchParams(window.location.search);
const teamName = urlParams.get('team');

// チーム名表示
document.getElementById('teamName').innerText = `${teamName} の結果`;

// スプレッドシートからデータを引っ張る
fetch('https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbyGWsM1rZxiBOS_YXghTUYk32acT2MEh6AFXnzKaBPwG9JtlIcu8XuwMyR6qpwKpjxK/exec/exec?team=' + teamName)
    .then(response => response.json())
    .then(data => {
        if (data.score) {
            document.getElementById('score').innerText = `得点：${data.score}点！ お疲れ様でした！`;
        } else {
            document.getElementById('score').innerText = 'データが見つかりませんでした...';
        }
    })
    .catch(err => {
        console.error('エラー:', err);
        document.getElementById('score').innerText = 'データの読み込みに失敗しました';
    });
