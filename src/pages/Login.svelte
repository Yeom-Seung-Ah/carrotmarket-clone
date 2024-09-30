<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      user$.set(user);
      localStorage.setItem("token", token);
    } catch (error) {
      // 수정된 부분
      console.error(error);
    }
  };
</script>

<div>
  <div class="login-title">로그인</div>
  <button class="login-btn" on:click={loginWithGoogle}>
    <img
      class="google-img"
      src="https://img.icons8.com/color/200/google-logo.png"
      alt=""
    />
    <div>Google로 시작하기</div>
  </button>
</div>

<style>
  .login-title {
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .google-img {
    width: 20px;
  }
  .login-btn {
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
  }
</style>
