import EventEmitter, {
	EmitterSubscription,
} from "react-native/Libraries/vendor/emitter/EventEmitter";

export const eventEmitter = new EventEmitter();

export function emitEvent(event: string, ...args: any[]): void {
	return eventEmitter.emit(event, ...args);
}

export function addEventListener(
	event: string,
	listener: (...args: any[]) => any,
	context?: any,
): EmitterSubscription {
	return eventEmitter.addListener(event, listener, context);
}

export function removeAllEventListeners(event?: string): void {
	return eventEmitter.removeAllListeners(event);
}
