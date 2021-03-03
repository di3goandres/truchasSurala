update 
  
 lote_numero l_n
	inner join (
    
		select  l_n.id, sum(tb.cantidad) 'suma'

		FROM lote_numero l_n
			left join lotes lotes on l_n.id = lotes.id_lote_numero
			left join bandeja_lote bl on bl.id_lote = lotes.id
			left join trazabilidad_bandejas tb on tb.id_bandeja_lote = bl.id  
			left join trazabilidad t on tb.id_trazabilidad =  t.id 
			left join pedidos p on  t.id_pedido = p.id

			inner join despachos d on d.id = l_n.id_despacho
			left join   fincas f  on t.id_finca = f.id
			where f.propia = true
		group by
		--  d.fecha_salida,
		-- d.fecha_salida,
			lotes.fecha_desove,
			lotes.id_lote_numero,
			lotes.linea_genetica,
			lotes.numero_lote,
			lotes.edad_tcu,
			lotes.tamanio,
			lotes.ovas_ml
			order by 1
    ) i on l_n.id = i.id
    set l_n.total_lote_propios = i.suma
    where l_n.id = i.id