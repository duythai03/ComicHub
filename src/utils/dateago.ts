const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_DAY = 86400;
const SECONDS_IN_A_MONTH = 2592000; // Giả sử 30 ngày mỗi tháng
const SECONDS_IN_A_YEAR = 31536000; // Giả sử 365 ngày mỗi năm

const DEFAULT_THRESHOLD_SECONDS = 20 * SECONDS_IN_A_DAY;

export const formatSecondsAgo = (seconds: number) => {
	return `${seconds} giây trước`;
};

export const formatMinutesAgo = (minutes: number) => {
	return `${minutes} phút trước`;
};

export const formatHoursAgo = (hours: number) => {
	return `${hours} giờ trước`;
};

export const formatDaysAgo = (days: number) => {
	return `${days} ngày trước`;
};

export const formatMonthsAgo = (months: number) => {
	return `${months} tháng trước`;
};

export const formatYearsAgo = (years: number) => {
	return `${years} năm trước`;
};

export const formatTimeAgo = (
	dateAgoString: string,
	threshold_seconds: number = DEFAULT_THRESHOLD_SECONDS,
) => {
	if (!dateAgoString) {
		return "Không xác định";
	}

	const dateAgo = new Date(dateAgoString);
	if (isNaN(dateAgo.getTime())) {
		throw new Error("Invalid date format");
	}
	const nowMs = new Date().getSeconds();
	const updatedDateMs = dateAgo.getSeconds();

	const diffSeconds = nowMs - updatedDateMs;
	if (diffSeconds >= threshold_seconds) {
		return dateAgo.toLocaleDateString();
	}

	if (diffSeconds < SECONDS_IN_A_MINUTE) {
		return formatSecondsAgo(diffSeconds);
	} else if (diffSeconds < SECONDS_IN_AN_HOUR) {
		return formatMinutesAgo(Math.floor(diffSeconds / SECONDS_IN_A_MINUTE));
	} else if (diffSeconds < SECONDS_IN_A_DAY) {
		return formatHoursAgo(Math.floor(diffSeconds / SECONDS_IN_AN_HOUR));
	} else if (diffSeconds < SECONDS_IN_A_MONTH) {
		return formatDaysAgo(Math.floor(diffSeconds / SECONDS_IN_A_DAY));
	} else if (diffSeconds < SECONDS_IN_A_YEAR) {
		return formatMonthsAgo(Math.floor(diffSeconds / SECONDS_IN_A_MONTH));
	} else {
		return formatYearsAgo(Math.floor(diffSeconds / SECONDS_IN_A_YEAR));
	}
};
