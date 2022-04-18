import { stringifyData } from "../../common/stringifier";
import { harperDB } from "../../harperdb/harperdb";
import { paginator } from "../../common/paginator";
import LibraryModel from "../library.model";

class BookModel extends LibraryModel {
    constructor() {
        super();
    }

    async save(args: { name: string; genre: string; authorId: string }) {
        const stringifiedData = stringifyData({
            operation: "insert",
            schema: this.schema,
            table: this.BOOK_TABLE_NAME,
            records: [args],
        });
        // since we aim at enterin just one record
        return this.findOne({ id: (await harperDB(stringifiedData)).data["inserted_hashes"][0] });
    }

    async findOne({ id }: { id: string }) {
        const stringifiedData = stringifyData({
            operation: "search_by_hash",
            schema: this.schema,
            table: this.BOOK_TABLE_NAME,
            hash_values: [id],
            get_attributes: ["*"],
        });
        return (await harperDB(stringifiedData)).data[0];
    }

    async find({ pgSize, pgNumber, condition }: { pgSize?: number; pgNumber?: number; condition?: string }) {
        // pseudo total count of documents
        const { skip, limit } = paginator(40, pgNumber, pgSize);

        let stringifiedData = stringifyData({
            operation: "sql",
            sql: `SELECT * FROM library.books LIMIT ${limit}`,
        });

        if (condition)
            stringifiedData = stringifyData({
                operation: "sql",
                sql: `SELECT * FROM library.books WHERE ` + condition,
            });

        return (await harperDB(stringifiedData)).data;
    }

    async update({ id, name, genre, authorId }: { id: string; name?: string; genre?: string; authorId?: string }) {
        // pseudo total count of documents

        const stringifiedData = stringifyData({
            operation: "update",
            schema: this.schema,
            table: this.BOOK_TABLE_NAME,
            records: [
                {
                    id,
                    name,
                    genre,
                    authorId,
                },
            ],
        });
        await harperDB(stringifiedData);
        return this.findOne({ id });
    }

    async remove({ id }: { id: string }) {
        // pseudo total count of documents

        const oldRecord = await this.findOne({ id });

        const stringifiedData = stringifyData({
            operation: "delete",
            schema: this.schema,
            table: this.BOOK_TABLE_NAME,
            hash_values: [id],
        });

        await harperDB(stringifiedData);
        return oldRecord;
    }
}

export default BookModel;
