// URLからチーム名を取り出す
const params = new URLSearchParams(window.location.search);
const teamName = params.get('team');

// チーム名がない場合の処理
if (!teamName) {
    document.getElementById('result').innerHTML = 'チーム名が見つかりませんでした…';
} else {
    // Google Apps ScriptのURLにチーム名を送ってデータを取得
    fetch(`https://script.google.com/macros/s/AKfycbx6UZ1QyBJ9SRJM9ZGsJ12_w0G1VbFxTWoXYqST3wIygTdQWmmf0ZQXhiC61d/exec?team=${teamName}`)
        .then(response => response.json())
        .then(data => {
            // データがあった場合
            if (data && data.score != null) {
                document.getElementById('result').innerHTML = `
                    ${teamName} の結果は <strong>${data.score}</strong> 点でした！<br>
                    お疲れ様でした！
                `;
            } else {
                // データがなかった場合
                document.getElementById('result').innerHTML = 'データが見つかりませんでした…';
            }
        })
        .catch(error => {
            // データ取得に失敗した場合
            console.error('データ取得失敗:', error);
            document.getElementById('result').innerHTML = `データ取得に失敗しました…<br>${error}`;
        });
}
