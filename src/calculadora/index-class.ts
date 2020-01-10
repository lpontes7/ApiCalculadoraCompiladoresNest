interface Sliceable<T> {
    slice(start?: number, end?: number): T;
    length: number;
}

export class SlicingIterator<T> {
    private index = -1;

    constructor(private iterable: Sliceable<T>) { }

    consume(count?: number) {
        if (!count) {
            count = 1;
        }

        this.index += count;

        if (this.index < this.iterable.length) {
            return { element: this.iterable.slice(this.index), done: false, index: this.index };
        } else {
            return { done: true, index: this.index };
        }
    }
}

interface Peekable<T> {
    [index: number]: T;
    length: number;
}

// tslint:disable-next-line:max-classes-per-file
export class PeekingIterator<T> {
    private index = -1;

    constructor(private iterable: Peekable<T>) { }

    consume(count?: number) {
        if (!count) {
            count = 1;
        }

        this.index += count;

        if (this.index < this.iterable.length) {
            return { element: this.iterable[this.index], done: false, index: this.index };
        } else {
            return { done: true, index: this.index };
        }
    }

    peek(count?: number) {
        if (!count) {
            count = 1;
        }

        if (this.index + count < this.iterable.length) {
            return {
                element: this.iterable[this.index + count],
                index: this.index + count,
                done: false,
            };
        } else {
            return { done: true, index: this.index };
        }
    }
}