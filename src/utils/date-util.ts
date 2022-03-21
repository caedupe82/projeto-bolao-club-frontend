export class DateUtil {

    public static converterData(data: string): string {
        if (data == null) {
            return '';
        }

        if (data.includes('/')) {
            return data;
        }

        const dataRetorno = data.replace('-', '');

        const ano = dataRetorno.substring(0,4);
        const mes = dataRetorno.substring(4,6);
        const dia = dataRetorno.substring(7,9);

        return dia + '/' + mes + '/' + ano;
    }

}