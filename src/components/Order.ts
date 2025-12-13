import { ensureElement } from "../utils/utils";
import { Form } from "./base/Form";
import { IEvents } from "./base/Events";
import { TPayment } from "../types";

interface IOrder {
  payment: TPayment | null;
  address: string;
  errors: string; // Изменено: теперь string вместо Partial<IBuyerErrors>
  valid: boolean; // Обязательное поле
}

export class Order extends Form<IOrder> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement
  ) {
    super(events, container);

    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container
    );

    this.setupEventListeners();
  }

  protected get submitEventName(): string {
    return "order:next";
  }

  private setupEventListeners(): void {
    // Обработка способа оплаты
    this.cardButton.addEventListener("click", () => {
      this.events.emit("order:payment:change", { payment: "online" });
    });

    this.cashButton.addEventListener("click", () => {
      this.events.emit("order:payment:change", { payment: "offline" });
    });

    // Обработка адреса
    this.addressInput.addEventListener("input", () => {
      this.events.emit("order:address:change", {
        address: this.addressInput.value,
      });
    });
  }

  set payment(value: TPayment | null) {
    const isCard = value === "online";
    const isCash = value === "offline";

    this.cardButton.classList.toggle("button_alt-active", isCard);
    this.cashButton.classList.toggle("button_alt-active", isCash);
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}