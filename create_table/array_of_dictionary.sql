create table saveErpProducePrice(
    saveErpProducePrice_uid UUID not null primary key,
    createdAt timestamp,
    updatedAt timestamp,
    dataValue text[][],
    isProcessed boolean
    )



insert into saveErpProducePrice