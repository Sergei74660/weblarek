import { ensureElement } from "../utils/utils";
import { Form } from "./base/Form";
import { IEvents } from "./base/Events";

interface IContacts {
  email: string;
  phone: string;
  errors: string; // Изменено: теперь string
  valid: boolean; // Обязательное поле
}

export class Contacts extends Form<IContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement
  ) {
    super(events, container);

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );

    this.setupEventListeners();
  }

  protected get submitEventName(): string {
    return "contacts:submit";
  }

  private setupEventListeners(): void {
    // Обработка email
    this.emailInput.addEventListener("input", () => {
      this.events.emit("contacts:email:change", {
        email: this.emailInput.value,
      });
    });

    // Обработка телефона
    this.phoneInput.addEventListener("input", () => {
      this.events.emit("contacts:phone:change", {
        phone: this.phoneInput.value,
      });
    });
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}