import { AxiosResponse } from "axios";
import { stringifyData } from "../common/stringifier";
import { harperDB } from "../harperdb/harperdb";

class LibraryModel {
    // Library info
    protected schema = "library";
    static schema = "library";
    private static BASEResponse: AxiosResponse<any, any> | null;
    private static BASEError: AxiosResponse<any, any> | null = null;

    // Table creation info
    private static BOOKResponse: AxiosResponse<any, any> | null;
    private static BOOKError: AxiosResponse<any, any> | null;
    private static BOOK_TABLE_NAME = "books";
    protected BOOK_TABLE_NAME = "books";

    // Author creation info
    private static AUTHORResponse: AxiosResponse<any, any> | null;
    private static AUTHORError: AxiosResponse<any, any> | null;
    private static AUTHOR_TABLE_NAME = "authors";
    protected AUTHOR_TABLE_NAME = "authors";

    constructor() {}

    static async setupDB() {
        try {
            const checkIfSchemaExist = await LibraryModel.checkIfSchemaExit();
            if (!checkIfSchemaExist) {
                // create schema of the library
                const createSchemaData = stringifyData({
                    operation: "create_schema",
                    schema: this.schema,
                });
                LibraryModel.BASEError = null;
                this.BASEResponse = await harperDB(createSchemaData);
            }
            if (!(await LibraryModel.checkIfTableExist(LibraryModel.BOOK_TABLE_NAME))) {
                // create the books table
                const createBookTable = stringifyData({
                    operation: "create_table",
                    schema: LibraryModel.schema,
                    table: LibraryModel.BOOK_TABLE_NAME,
                    hash_attribute: "id",
                });
                LibraryModel.BOOKError = null;
                LibraryModel.BOOKResponse = await harperDB(createBookTable);
            }
            if (!(await LibraryModel.checkIfTableExist(LibraryModel.AUTHOR_TABLE_NAME))) {
                // create the authors table
                const createAuthorTable = stringifyData({
                    operation: "create_table",
                    schema: LibraryModel.schema,
                    table: LibraryModel.AUTHOR_TABLE_NAME,
                    hash_attribute: "id",
                });
                LibraryModel.AUTHORError = null;
                LibraryModel.AUTHORResponse = await harperDB(createAuthorTable);
            }
            console.info("Libray Setup on HarperDB now completed");
        } catch (error) {
            this.BASEError = error as unknown as AxiosResponse<any, any>;
            return error;
        }
    }

    checkError() {
        return LibraryModel.BASEError;
    }

    private static async checkIfSchemaExit() {
        const checkIfSchemaExist = stringifyData({
            operation: "describe_schema",
            schema: LibraryModel.schema,
        });

        try {
            const { data } = await harperDB(checkIfSchemaExist);
            return data;
        } catch (error) {
            LibraryModel.BASEError = error as unknown as AxiosResponse<any, any>;
            return null;
        }
    }

    static async checkIfTableExist(tableName: string) {
        const checkIfTableExist = stringifyData({
            operation: "describe_table",
            schema: this.schema,
            table: tableName,
        });

        try {
            const { data } = await harperDB(checkIfTableExist);
            return data;
        } catch (error) {
            return null;
        }
    }
}

export default LibraryModel;
