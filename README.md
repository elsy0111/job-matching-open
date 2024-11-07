<p align="center">
    <img src="https://raw.githubusercontent.com/elsy0111/job-matching-open/refs/heads/master/public/logo.png" align="center" width="30%">
</p>
<p align="center"><h1 align="center">JOB-MATCHING</h1></p>
<p align="center">
	<em>More efficient job matching for engineers and companies.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/elsy0111/job-matching-open?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/elsy0111/job-matching-open?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/elsy0111/job-matching-open?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/elsy0111/job-matching-open?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

### 🔗  TRY IT OUT 今すぐ試す
### &nbsp;&nbsp;[Job-Matching](https://job-matching-one.vercel.app/) 
&nbsp; https://job-matching-one.vercel.app/

## INDEX

- [INDEX](#index)
- [📍 概要 - Abstract -](#-概要---abstract--)
- [👾 特徴 - Features -](#-特徴---features--)
- [📁 ファイルの階層 - Project Structure -](#-ファイルの階層---project-structure--)
	- [📂 詳細 - Details -](#-詳細---details--)
- [🚀 実行 - Getting Started -](#-実行---getting-started--)
	- [☑️ 前提条件 - Prerequisites -](#️-前提条件---prerequisites--)
	- [🤖 使用法 - Usage -](#-使用法---usage--)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)

---

## 📍 概要 - Abstract - 

`Job-Matching` は、エンジニアと企業をつなぐプラットフォームを提供するプロジェクトです。
`Job-Matching` システムは、マッチングを TF-IDF, Cosine 類似度を用いて行うため、
異なる言語、文章の形式にとらわれない高度なマッチングが可能です。

高度なテキストマッチングとレスポンシブなUIを活用して、
あなたの応募/募集に適した募集/応募をパーソナライズします。

機会を求めているエンジニアと雇用を検討している企業のために設計されたこのプロジェクトは、
採用プロセスを高速化し、効率的で正確なジョブマッチングを実現します。

---

## 👾 特徴 - Features - 

|      |        特徴        | 詳細                                                                                                                                                                                                                                                                                                                       |
| :--- | :----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️    | **アーキテクチャ** | <ul><li>フロントエンドに<code>Next.js</code>を採用し、SSRを重視した設計</li><li>バックエンドは<code>Firebase Cloud Functions</code>で管理し、ジョブマッチングロジックを含む関数を実装</li><li><code>Firebase Realtime Database</code>を用いた、リアルタイムDB設計</li><li>OAuthでセキュア認証を実現</li></ul> |
| 🧩    |  **モジュール化**  | <ul><li>再利用可能なReactコンポーネントに分解</li><li><code>tailwind-css</code>などのCSSフレームワークを用いた動的でシンプルなスタイリング</li><li>UI、認証、データベースに関する役割分担が明確</li></ul>                                                                                                                  |
| ⚡️    | **パフォーマンス** | <ul><li>Next.jsの静的およびサーバーレンダリングを併用した効率的な読み込み</li><li>効率的なデータ取得とキャッシュメカニズムを活用</li><li>PostCSSと<code>Tailwind CSS</code>によるスタイルパフォーマンスの最適化</li></ul>                                                                                                  |
| 🛡️    |  **セキュリティ**  | <ul><li>OAuthと<code>Firebase</code>認証によるユーザーデータの保護</li><li>HTTPSリクエストを通じずにDBとの通信を行う</li></ul>                                                                                                                                                                                             |
| 📦    |    **依存関係**    | <ul><li>JavaScriptとPythonの依存関係管理に<code>npm</code>と<code>pip</code>を使用</li><li>主要ライブラリは<code>React</code>、<code>Next.js</code>、<code>Firebase</code></li></ul>                                                                                                                                       |

---


## 📁 ファイルの階層 - Project Structure -

```sh
└── job-matching-open/
    ├── LICENSE
    ├── README.md
    ├── app
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── list
    │   │   └── page.tsx
    │   ├── page.tsx
    │   ├── recommendation
    │   │   └── page.tsx
    │   └── registrate
    │       └── page.tsx
    ├── components
    │   ├── BackButton.js
    │   ├── GetStatus.js
    │   ├── Header.js
    │   ├── List
    │   │   └── GetList.js
    │   ├── Loading.js
    │   ├── Login
    │   │   ├── AccountRegister.js
    │   │   ├── Login.js
    │   │   └── Logout.js
    │   ├── Recommend
    │   │   └── GetRecommendation.js
    │   ├── Select.js
    │   ├── SendForm
    │   │   └── SendForm.js
    │   ├── Status.js
    │   └── ui
    │       └── sonner.tsx
    ├── components.json
    ├── context
    │   └── UserContext.js
    ├── firebase
    │   ├── .firebaserc
    │   ├── .gitignore
    │   ├── firebase.json
    │   └── functions
    │       ├── .gitignore
    │       ├── main.py
    │       ├── requirements.txt
    │       ├── secrets
    │       │   ├── credfile.json
    │       │   ├── firebaseConfig.js
    │       │   └── firebaseConfig.json
    │       └── src
    │           ├── data_manager.py
    │           ├── matcher.py
    │           └── vectorizer.py
    ├── firebaseinit.js
    ├── next.config.mjs
    ├── oauth_secret.json
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── favicon.ico
    │   ├── next.svg
    │   ├── vercel.svg
    │   ├── wallpaper_dark1.jpg
    │   ├── wallpaper_white.jpg
    │   ├── wb.jpg
    │   └── ww.png
    ├── src
    │   ├── components
    │   │   └── ui
    │   │       └── sonner.tsx
    │   └── lib
    │       └── utils.ts
    ├── tailwind.config.ts
    └── tsconfig.json
```
---

### 📂 詳細 - Details -
(一部省略)
<details open>
	<summary><b><code>JOB-MATCHING-OPEN/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/oauth_secret.json'>oauth_secret.json</a></b></td>
				<td>- OAuthの資格情報を保存しており、認証に用いる。</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<details>
						<summary><b>ui</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/src/components/ui/sonner.tsx'>sonner.tsx</a></b></td>
								<td>- 通知をカスタマイズするコンポーネント。</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- components Submodule -->
		<summary><b>components</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/Header.js'>Header.js</a></b></td>
				<td>- ヘッダーコンポーネントを定義し、Headerタグで使い回せるようにする。</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/Select.js'>Select.js</a></b></td>
				<td>- ユーザーのroleに基づいて選択できるボタンを表示する。</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/GetStatus.js'>GetStatus.js</a></b></td>
				<td>- 認証状況を確認し、認証されてない場合ログインページを表示する。</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/Status.js'>Status.js</a></b></td>
				<td>- 現在のユーザー情報(email, ユーザ名)を表示する。</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/Loading.js'>Loading.js</a></b></td>
				<td>- ローディングを示すUIを表示する。</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/BackButton.js'>BackButton.js</a></b></td>
				<td>- 前のページに戻るためのナビゲーションボタンを表示する。</td>
			</tr>
			</table>
			<details>
				<summary><b>List</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/List/GetList.js'>GetList.js</a></b></td>
						<td>- Firebase DB からリストを動的に取得し表示する。</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>SendForm</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/SendForm/SendForm.js'>SendForm.js</a></b></td>
						<td>- 応募/募集を行うフォーム。</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>Login</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/Login/Logout.js'>Logout.js</a></b></td>
						<td>- ユーザーをアカウントからサインアウトさせる函数。</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/Login/Login.js'>Login.js</a></b></td>
						<td>- Google OAuthでユーザー認証を管理。</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/Login/AccountRegister.js'>AccountRegister.js</a></b></td>
						<td>- 新規アカウント登録時にユーザーにroleを選択させる。</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>Recommend</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/Recommend/GetRecommendation.js'>GetRecommendation.js</a></b></td>
						<td>- Cosine 類似度が高い順におすすめをを表示する。</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>ui</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/components/ui/sonner.tsx'>sonner.tsx</a></b></td>
						<td>- モダンな通知を表示するコンポーネント。</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- context Submodule -->
		<summary><b>context</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/context/UserContext.js'>UserContext.js</a></b></td>
				<td>- ユーザーデータの状態管理を行います。</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- app Submodule -->
		<summary><b>app</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/app/layout.tsx'>layout.tsx</a></b></td>
				<td>- 全てに共通のレイアウト。</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/app/globals.css'>globals.css</a></b></td>
				<td>- 全てに共通のスタイル。</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/app/page.tsx'>page.tsx</a></b></td>
				<td>- トップページ。様々なコンポーネントを呼んでいる。</td>
			</tr>
			</table>
			<details>
				<summary><b>list</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/app/list/page.tsx'>page.tsx</a></b></td>
						<td>- 現在出されている応募/募集を一括で見る。</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>recommendation</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/app/recommendation/page.tsx'>page.tsx</a></b></td>
						<td>- ユーザにおすすめの募集/応募を表示する。</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>registrate</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/app/registrate/page.tsx'>page.tsx</a></b></td>
						<td>- 応募/募集 のポストや編集、削除を行うためのフォーム。</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- firebase Submodule -->
		<summary><b>firebase</b></summary>
		<blockquote>
			<details>
				<summary><b>functions</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/firebase/functions/main.py'>main.py</a></b></td>
						<td>- roleの取得とマッチングを返すバックエンドのmain函数。</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/firebase/functions/requirements.txt'>requirements.txt</a></b></td>
						<td>- Firebase Cloud Functionsに必要な依存関係をまとめている。</td>
					</tr>
					</table>
<details>
						<summary><b>src</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/firebase/functions/src/matcher.py'>matcher.py</a></b></td>
								<td>- テキスト類似度を計算する函数。</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/firebase/functions/src/data_manager.py'>data_manager.py</a></b></td>
								<td>- Firebaseデータベースとのやりとりを行う函数。</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/firebase/functions/src/vectorizer.py'>vectorizer.py</a></b></td>
								<td>- 生テキストを数値形式に変換・TF-IDFベクトル生成函数。</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>secrets</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/firebase/functions/secrets/firebaseConfig.json'>firebaseConfig.json</a></b></td>
								<td>- Firebase DB に必要な設定を管理。</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/firebase/functions/secrets/credfile.json'>credfile.json</a></b></td>
								<td>- firebaseConfig.jsに書かれているjsonを抽出したもの。</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/elsy0111/job-matching-open/blob/master/firebase/functions/secrets/firebaseConfig.js'>firebaseConfig.js</a></b></td>
								<td>- Firebaseの初期化に必要な設定を管理。</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
## 🚀 実行 - Getting Started -

### ☑️ 前提条件 - Prerequisites -

実行環境が以下の要件を満たしていることを確認してください。

**Clone:**

1. job-matching-openリポジトリをクローンします:
```sh
❯ git clone https://github.com/elsy0111/job-matching-open
```

2. プロジェクトディレクトリに移動します:
```sh
❯ cd job-matching-open
```

3. プロジェクトの依存関係をインストールします:


**`npm`を使用する** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)


```sh
❯ npm install
```


**`pip`を使用する** &nbsp; [<img align="center" src="https://img.shields.io/badge/Python-3776AB?style={badge_style}&logo=python&logoColor=white" />]()

```sh
❯ pwd
>> /path/to/job-matching-open/firebase/functions
❯ <activate venv>
❯ pip install -r requirements.txt
```


### 🤖 使用法 - Usage -
以下のコマンドを使用して実行します

**`npm`を使用する** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run dev
```

**`python`を使用する** &nbsp; [<img align="center" src="https://img.shields.io/badge/Python-3776AB?style={badge_style}&logo=python&logoColor=white" />]()

```sh
❯ firebase serve --only functions
```
---

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/elsy0111/job-matching-open/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/elsy0111/job-matching-open/issues)**: Submit bugs found or log feature requests for the `job-matching-open` project.
- **💡 [Submit Pull Requests](https://github.com/elsy0111/job-matching-open/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/elsy0111/job-matching-open
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/elsy0111/job-matching-open/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=elsy0111/job-matching-open">
   </a>
</p>
</details>

---

## 🎗 License

This project is protected under the 
[MIT](https://choosealicense.com/licenses/mit/)
[<img align="center" src="https://img.shields.io/badge/license-mit-blue" />]() 
License. For more details, refer to the 
[LICENSE](https://choosealicense.com/licenses/mit/) file.
