// 要素の取得
const quantities = document.querySelectorAll(".quantity");
const totalPriceElement = document.getElementById("total-price");
const resetButton = document.getElementById("reset-button");
const remainingAmountDisplay = document.getElementById("remaining-amount");
const numberOfPeopleSelect = document.getElementById("number-of-people");
const totalBudgetDisplay = document.getElementById("total-budget");

// 初期設定
let budgetPerPerson = 5000; // 1人あたりの予算
let numberOfPeople = parseInt(numberOfPeopleSelect.value, 10); // 初期人数
let totalBudget = numberOfPeople * budgetPerPerson;

// 初期表示
function updateBudgetDisplay() {
  totalBudgetDisplay.textContent = totalBudget; // 合計予算を表示
}

// 合計金額と背景の更新
function updateTotalAndBackground() {
  let total = 0;

  // 合計金額の計算
  quantities.forEach((quantity) => {
    const price = parseInt(quantity.closest(".menu-item").dataset.price, 10);
    const quantityValue = parseInt(quantity.value, 10) || 0;
    total += price * quantityValue;
  });

  // 合計金額を表示
  totalPriceElement.textContent = total;

  // 残り金額を計算
  const remainingAmount = totalBudget - total;

  // 残り金額を表示
  remainingAmountDisplay.textContent = `残りの注文可能金額: ${remainingAmount}円`;

  // 背景全体を塗りつぶす割合を計算
  let progressPercentage = Math.max(
    0,
    Math.min((total / totalBudget) * 100, 100)
  );

  // 背景全体を赤く塗りつぶす
  let backgroundColor = `rgba(255, 0, 0, 0.3)`; // デフォルトの薄い赤色
  if (remainingAmount <= 20000) {
    backgroundColor = `rgba(255, 0, 0, 0.6)`; // 残り2万円以下で濃い赤色
  }
  if (remainingAmount < 0) {
    backgroundColor = `rgba(255, 0, 0, 0.8)`; // 予算超過でさらに濃い赤色
  }

  remainingAmountDisplay.style.background = `linear-gradient(
    to right,
    ${backgroundColor} ${progressPercentage}%,
    white ${progressPercentage}%
  )`;
}

// 人数変更時の処理
numberOfPeopleSelect.addEventListener("change", () => {
  numberOfPeople = parseInt(numberOfPeopleSelect.value, 10);
  totalBudget = numberOfPeople * budgetPerPerson;
  updateBudgetDisplay();
  updateTotalAndBackground();
});

// メニューの数量変更時の処理
quantities.forEach((quantity) => {
  quantity.addEventListener("input", updateTotalAndBackground);
});

// リセットボタンの処理
resetButton.addEventListener("click", () => {
  if (confirm("本当にリセットしますか？")) {
    quantities.forEach((quantity) => {
      quantity.value = 0; // 数量をリセット
    });
    updateTotalAndBackground();
  }
});

// 初期化
updateBudgetDisplay();
updateTotalAndBackground();
