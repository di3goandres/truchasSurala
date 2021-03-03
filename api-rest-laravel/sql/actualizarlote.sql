update 
  
 lote_numero l_n
	inner join (
    
		select  l_n.id,  case 
			 when sum(bl.tamanio_inicial) is null then 0
                else sum(bl.tamanio_inicial)
			end  as 'suma'
			 
			FROM lote_numero l_n
				left join lotes lotes on l_n.id = lotes.id_lote_numero
				left join bandeja_lote bl on bl.id_lote = lotes.id
						
			where 
			
			id_lote_numero is not null
			group by
		
			 lotes.fecha_desove,
			 lotes.id_lote_numero,
			 lotes.linea_genetica,
			 lotes.numero_lote,
			 lotes.edad_tcu,
			 lotes.tamanio,
			 lotes.ovas_ml
			 order by 1
    ) i on l_n.id = i.id
    set l_n.total_lote = i.suma
    where l_n.id = i.id